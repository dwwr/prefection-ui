/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { animate, createScope, createTimeline } from 'animejs'
import { useEffect, useRef } from 'react'

const barStyle = css`
  display: flex;
`

const segmentStyle = css`
  width: 12rem;
  height: 3rem;
  background-color: blue;
  border-radius: 999px;
  margin-left: -3rem;
  display: none;
`

export const Bar = () => {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = createTimeline({ defaults: { duration: 200 } })

    const scope = createScope({ root }).add(() => {
      const show = {
        duration: 0,
        display: ['none', 'block'],
      }
      const flipUp = {
        duration: 200,
        ease: 'outQuad',
        rotate: ['-180deg', '0deg'],
        transformOrigin: 'left',
      }

      const flipDown = {
        ...flipUp,
        rotate: ['180deg', '0deg'],
      }

      for (let i = 0; i < 5; i++) {
        tl.add(`.segment-${i}`, show)
        tl.add(`.segment-${i}`, i % 2 === 0 ? flipUp : flipDown)
      }
    })

    return () => {
      scope.revert()
    }
  }, [])

  return (
    <div css={barStyle} ref={root}>
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className={`segment-${index}`} css={segmentStyle} />
      ))}
    </div>
  )
}
