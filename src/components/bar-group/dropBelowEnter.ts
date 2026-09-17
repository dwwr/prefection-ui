import { createScope, createTimeline } from 'animejs'
import type { RefObject } from 'react'

export function runDropBelowEnter(
  nested: RefObject<HTMLDivElement | null>,
  rowHeight?: number
): () => void {
  const scope = createScope({ root: nested }).add(() => {
    const root = nested.current
    if (!root) return

    const tip = root.querySelector<HTMLElement>(':scope > .tip-item')
    const children = root.querySelectorAll<HTMLElement>(
      ':scope > .bar-group > .nav-item'
    )

    const rows: HTMLElement[] = []
    if (tip) rows.push(tip)
    children.forEach(el => rows.push(el))
    if (!rows.length) return

    const h = rowHeight || rows[0].offsetHeight || 48
    const tl = createTimeline({ defaults: { ease: 'outQuad' } })

    // Start: rows parked off to the left
    tl.set(root, { height: 0, overflow: 'hidden' })
    for (const row of rows) {
      tl.set(row, { x: '-15rem' })
    }

    // Grow space for child, then slide in from the left
    for (let i = 0; i < rows.length; i++) {
      tl.add(root, { height: (i + 1) * h, duration: 80 })
      tl.add(rows[i], { x: 0, duration: 100 })
    }

    tl.set(root, { overflow: 'visible' })
  })

  return () => {
    scope.revert()
  }
}
