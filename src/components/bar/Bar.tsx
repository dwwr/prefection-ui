/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { createScope, createTimeline } from 'animejs'
import { useEffect, useRef } from 'react'

const barStyle = css`
  display: flex;
  /* background-color: red; */
`

const segmentStyle = css`
  width: 15rem;
  height: 3rem;
  background-color: blue;
  border-radius: 999px;
  margin-left: -3rem;
  display: none;
  justify-content: flex-end;
  align-items: center;
  gap: 0.5rem;
  transform-origin: left center;
  overflow: visible;
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
  label,
  segments,
  onClick,
}: BarProps) => {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = createTimeline({ defaults: { duration: 200 } })

    const scope = createScope({ root }).add(() => {
      const show = {
        duration: 0,
        display: ['none', 'flex'],
      }

      const flipUp = {
        duration: 300,
        rotate: ['-180deg', '0deg'],
        transformOrigin: 'left center',
      }

      const flipDown = {
        ...flipUp,
        rotate: ['180deg', '0deg'],
      }

      for (let i = 0; i < segments; i++) {
        tl.add(`.segment-${i}`, show)
        tl.add(`.segment-${i}`, i % 2 === 0 ? flipUp : flipDown)
        if (i === 4) {
          tl.add(`.label-${i}`, show)
          tl.add(`.dot-${i}`, show)
        }
      }
    })

    return () => {
      scope.revert()
    }
  }, [])

  return (
    <div css={barStyle} ref={root}>
      {Array.from({ length: segments }).map((_, index) => (
        <div key={index} className={`segment-${index}`} css={segmentStyle}>
          <div
            className={`label-${index}`}
            css={{ ...labelStyle, color: color }}
          >
            {label}
          </div>
          <div
            className={`dot-${index}`}
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
  label: string
  segments: number
  onClick?: () => void
}
