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
  width: 15rem;
  height: var(--h);
  background-color: blue;
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
  background-color: lightblue;
  display: none;
`

export const Bar = ({
  color,
  dotColor,
  duration,
  label,
  segments,
  onClick,
}: BarProps) => {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = createTimeline({ defaults: { duration } })

    const scope = createScope({ root }).add(() => {
      const show = {
        duration: 0,
        display: ['none', 'flex'],
      }

      const flipUp = {
        duration: duration,
        rotate: ['-180deg', '0deg'],
      }

      const flipDown = {
        ...flipUp,
        rotate: ['180deg', '0deg'],
      }

      for (let i = 0; i < segments; i++) {
        tl.add(`.segment-${i}`, show)
        tl.add(`.segment-${i}`, i % 2 === 0 ? flipUp : flipDown)
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
      {Array.from({ length: segments }).map((_, i) => (
        <div
          key={i}
          className={`segment-${i}`}
          css={segmentStyle}
          style={{ zIndex: i }}
        >
          <div className={`label-${i}`} css={{ ...labelStyle, color: color }}>
            {label}
          </div>
          <div
            className={`dot-${i}`}
            css={{ ...dotStyle, backgroundColor: dotColor }}
            onClick={onClick}
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
  onClick?: () => void
}
