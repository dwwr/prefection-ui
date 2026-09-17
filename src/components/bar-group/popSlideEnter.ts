import { createScope, createTimeline } from 'animejs'
import type { RefObject } from 'react'

/**
 * Nested children enter: pop out to the right, land, jostle, then droop.
 * Returns a cleanup that reverts the anime scope.
 */
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

    // --- Initial set: stack below final seats, hidden, upright ---
    for (let i = 0; i < n; i++) {
      tl.set(items[i], {
        y: (n - i) * h,
        x: 0,
        opacity: 0,
        rotate: '0deg',
      })
    }

    // --- Tip reset: parent tip segment starts upright ---
    if (tip) {
      tl.set(tip, { rotate: '0deg' })
    }

    // Closest to parent first, building the stack upward
    for (let i = n - 1; i >= 0; i--) {
      const stacked = n - i
      const droop = `${stacked * droopStep}deg`
      const pop = `pop-${i}`
      const land = `land-${i}`

      // --- Pop: fade in and slide out to the right ---
      tl.add(items[i], { opacity: 1, x: '15rem', duration: 35 })
      // '<<' = start of the pop we just added (bare label() would mark timeline end)
      tl.label(pop, '<<')

      // --- Parent recoil: kick left with the pop, then return ---
      if (parent) {
        tl.add(parent, { x: '-0.5rem', duration: 35 }, pop)
        tl.add(parent, { x: 0, duration: 25 }, '<')
      }

      // --- Land: settle into final x/y seat ---
      tl.add(items[i], { x: 0, y: 0, duration: 25 }, `${pop}+=35`)
      tl.label(land, `${pop}+=60`)

      // --- Jostle: horizontal nudge on this child only, right after land ---
      tl.add(items[i], { x: '-1rem', duration: 50 }, land)
      tl.add(items[i], { x: '0.3rem', duration: 50 }, '<')
      tl.add(items[i], { x: 0, duration: 40 }, '<')

      // --- Droop: tip + settled stack lean after jostle (avoids rotate/x fight) ---
      const settled = [items[i], ...Array.from(items).slice(i + 1)]
      if (tip) settled.unshift(tip)
      tl.add(settled, { rotate: droop, duration: 140 }, '<')
    }
  })

  return () => {
    scope.revert()
  }
}
