/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { createScope, createTimeline } from 'animejs'
import { useEffect, useRef } from 'react'

const barStyle = css`
  display: flex;
  overflow: visible;
`

const segmentStyle = css`
  --h: 3rem;
  --w: 15rem;
  width: var(--w);
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
    margin-left: 0;
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

const extend = (
  rootEl: HTMLElement,
  { segments, duration }: { segments: number; duration: number }
) => {
  const last = segments - 1
  const next = segments
  const lastSeg = rootEl.querySelector(`.segment-${last}`)
  const nextSeg = rootEl.querySelector(`.segment-${next}`)
  const nextTip = rootEl.querySelectorAll(`.label-${next}, .dot-${next}`)
  if (!lastSeg || !nextSeg) return

  const tl = createTimeline({ defaults: { duration } })
  tl.add(lastSeg, { width: '22.5rem' })
  tl.add(nextSeg, show)
  tl.add(nextSeg, { width: { from: '0rem', to: '30rem' } })
  tl.add(nextTip, show)
  return tl
}

const motions = {
  extend,
  none: () => {},
}

export const Bar = ({
  color,
  dotColor,
  duration,
  label,
  segments,
  staggerDelay,
  zIndexBase,
  tip,
  select = 'extend',
  onClick,
}: BarProps) => {
  const root = useRef<HTMLDivElement>(null)
  const selected = useRef(false)
  const extra = select === 'extend' ? 1 : 0

  useEffect(() => {
    const tl = createTimeline({
      defaults: { duration },
    })

    const scope = createScope({ root }).add(() => {
      for (let i = 0; i < segments; i++) {
        tl.add(`.segment-${i}`, show, i === 0 ? staggerDelay ?? 0 : undefined)
        if (segments > 1) {
          tl.add(
            `.segment-${i}`,
            i % 2 === 0 ? flipUp(duration) : flipDown(duration)
          )
        }
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

  const handleClick = () => {
    if (select === 'extend' && root.current && !selected.current) {
      selected.current = true
      const tl = motions.extend(root.current, { segments, duration })
      if (tl) {
        tl.then(() => onClick?.())
        return
      }
    }
    onClick?.()
  }

  return (
    <div className="bar" css={barStyle} ref={root}>
      {Array.from({ length: segments + extra }).map((_, i) => {
        const isTip = extra > 0 && i === segments
        const segColor = isTip ? tip?.color ?? color : color
        const segDot = isTip ? tip?.dotColor ?? tip?.color ?? dotColor : dotColor
        const segLabel = isTip ? tip?.label ?? label : label

        return (
          <div
            key={i}
            className={`segment-${i}`}
            css={segmentStyle}
            style={{
              zIndex: i + (zIndexBase || 0),
              backgroundColor: segColor,
              ...(segments > 1 && i === 0
                ? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }
                : {}),
            }}
          >
            <div className={`label-${i}`} css={labelStyle}>
              {segLabel}
            </div>
            <div
              className={`dot-${i}`}
              css={dotStyle}
              style={{ backgroundColor: segDot }}
              onClick={handleClick}
            />
          </div>
        )
      })}
    </div>
  )
}

export type SelectMotion = 'extend' | 'none'

export interface BarTip {
  label: string
  color: string
  dotColor?: string
}

export interface BarProps {
  color: string
  dotColor: string
  duration: number
  label: string
  segments: number
  staggerDelay?: number
  zIndexBase?: number
  tip?: BarTip
  select?: SelectMotion
  onClick?: () => void
}
