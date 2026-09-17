/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { useEffect, useRef, useState } from 'react'
import { NavItem } from './NavItem'
import { runPopSlideEnter } from './popSlideEnter'
import type { BarGroupProps } from './types'

export type { BarGroupProps, NavItem } from './types'

const groupStyle = css`
  position: relative;
`

export const BarGroup = ({
  bars,
  staggerDelay = 0,
  zIndexBase = 0,
  enter,
  recoilFrom,
}: BarGroupProps) => {
  const root = useRef<HTMLDivElement>(null)
  const [selected, setSelected] = useState<string | null>(null)

  useEffect(() => {
    if (enter !== 'pop-slide') return
    return runPopSlideEnter(root, recoilFrom)
  }, [enter, bars, recoilFrom])

  return (
    <div className="bar-group" css={groupStyle} ref={root}>
      {bars.map((bar, index) => (
        <NavItem
          key={bar.label}
          bar={bar}
          index={index}
          staggerDelay={staggerDelay}
          zIndexBase={zIndexBase}
          selected={selected}
          setSelected={setSelected}
        />
      ))}
    </div>
  )
}
