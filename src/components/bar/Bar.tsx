/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { animate, createScope, createTimeline } from 'animejs'
import { useEffect, useRef } from 'react'

const barStyle = css`
  display: flex;
  overflow: visible;
`

const segmentStyle = css`
  --h: 3rem;
  width: 15rem;
  height: var(--h);
  min-height: var(--h);
  border-radius: 999px;
  margin-left: calc(-1 * var(--h));
  display: none;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
  transform-origin: calc(var(--h) / 2) center;
  overflow: visible;

  &:first-of-type {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
`

const labelStyle = css`
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  display: none;
  white-space: nowrap;
`

const dotStyle = css`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: none;
`

// animations
const show = {
  duration: 0,
  display: ['none', 'flex'],
}

const flipUp = (dur: number) => {
  return {
    duration: dur,
    rotate: ['-180deg', '0deg'],
  }
}

const flipDown = (dur: number) => {
  return {
    ...flipUp(dur),
    rotate: ['180deg', '0deg'],
  }
}

export const Bar = ({
  color,
  dotColor,
  duration,
  label,
  segments,
  staggerDelay,
  zIndexBase,
  onClick,
}: BarProps) => {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = createTimeline({
      defaults: { duration },
    })

    const scope = createScope({ root }).add(() => {
      for (let i = 0; i < segments; i++) {
        tl.add(`.segment-${i}`, show, i === 0 ? staggerDelay ?? 0 : undefined)
        tl.add(
          `.segment-${i}`,
          i % 2 === 0 ? flipUp(duration) : flipDown(duration)
        )
        if (i === segments - 1) {
          tl.add(`.label-${i}`, show)
          tl.add(`.dot-${i}`, show)
        }
      }
    })

    return () => {
      scope.revert()
    }
  }, [segments])

  return (
    <div css={barStyle} ref={root}>
      {Array.from({ length: segments + 1 }).map((_, i) => (
        <div
          key={i}
          className={`segment-${i}`}
          css={segmentStyle}
          style={{ zIndex: i + (zIndexBase || 0), backgroundColor: color }}
        >
          <div className={`label-${i}`} css={labelStyle}>
            {label}
          </div>
          <div
            className={`dot-${i}`}
            css={dotStyle}
            style={{ backgroundColor: dotColor }}
            onClick={event => {
              // animate(event.currentTarget, {
              //   scale: [1, 1.3, 1],
              //   duration: 200,
              // })

              // const i = segments // reserved extra, still hidden
              // const next = root.current?.querySelector(`.segment-${i}`)
              // const prevTip = root.current?.querySelectorAll(
              //   `.label-${i - 1}, .dot-${i - 1}`
              // )
              // const nextTip = root.current?.querySelectorAll(
              //   `.label-${i}, .dot-${i}`
              // )
              // const tl = createTimeline({ defaults: { duration } })
              // tl.add(next, show)
              // tl.add(nextTip, show)
              // onClick?.()

              const last = segments - 1
              const next = segments
              const rootEl = root.current
              if (!rootEl) return
              const lastSeg = rootEl.querySelector(`.segment-${last}`)
              const nextSeg = rootEl.querySelector(`.segment-${next}`)
              const nextTip = rootEl.querySelectorAll(
                `.label-${next}, .dot-${next}`
              )
              const tl = createTimeline({ defaults: { duration } })
              tl.add(lastSeg, { width: '22.5rem' })
              tl.add(nextSeg, show)
              tl.add(nextSeg, { width: { from: '0rem', to: '30rem' } })
              tl.add(nextTip, show)
              onClick?.()
            }}
          />
        </div>
      ))}
    </div>
  )
}

export interface BarProps {
  color: string
  dotColor: string
  duration: number
  label: string
  segments: number
  staggerDelay?: number
  zIndexBase?: number
  onClick?: () => void
}
