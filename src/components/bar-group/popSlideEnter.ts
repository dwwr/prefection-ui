import { createScope, createTimeline } from 'animejs'
import type { RefObject } from 'react'

export function runPopSlideEnter(
  root: RefObject<HTMLDivElement | null>,
  recoilFrom?: RefObject<HTMLDivElement | null>
): () => void {
  const scope = createScope({ root }).add(() => {
    const items =
      root.current?.querySelectorAll<HTMLElement>(':scope > .nav-item')
    if (!items?.length) return

    const parent =
      recoilFrom?.current?.querySelector<HTMLElement>(':scope > .bar')
    const tip = parent?.querySelector<HTMLElement>(
      ':scope > [class^=segment-]:last-child'
    )
    const n = items.length
    const h = items[0].offsetHeight || 48
    const droopStep = 0.25
    const tl = createTimeline({ defaults: { ease: 'outQuad' } })

    // Initially set items, hidden
    for (let i = 0; i < n; i++) {
      tl.set(items[i], {
        y: (n - i) * h,
        x: 0,
        opacity: 0,
        rotate: '0deg',
      })
    }

    // Closest to parent first, building the stack upward
    for (let i = n - 1; i >= 0; i--) {
      const stacked = n - i
      const droop = `${stacked * droopStep}deg`
      const pop = `pop-${i}`
      const land = `land-${i}`

      // Pop out to the right
      tl.add(items[i], { opacity: 1, x: '15rem', duration: 35 })
      tl.label(pop, 'a')

      // Parent recoil
      if (parent) {
        tl.add(parent, { x: '-0.5rem', duration: 35 }, pop)
        tl.add(parent, { x: 0, duration: 25 }, 'b')
      }

      // Item lands in final position in list
      tl.add(items[i], { x: 0, y: 0, duration: 25 }, `${pop}+=35`)
      tl.label(land, `${pop}+=60`)

      // Jostle as it lands
      tl.add(items[i], { x: '-1rem', duration: 50 }, land)
      tl.add(items[i], { x: '0.3rem', duration: 50 }, 'b')
      tl.add(items[i], { x: 0, duration: 40 }, 'b')

      // Droop the stack as it grows
      const settled = [items[i], ...Array.from(items).slice(i + 1)]
      if (tip) settled.unshift(tip)
      tl.add(settled, { rotate: droop, duration: 140 }, 'b')
    }
  })

  return () => {
    scope.revert()
  }
}
