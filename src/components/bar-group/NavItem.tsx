/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react'
import { Bar } from '../bar/Bar'
import { BarGroup } from './BarGroup'
import type { NavItem as NavItemConfig } from './types'

const itemStyle = css`
  position: relative;
  width: fit-content;
  transform-origin: left center;
`

const nestedStyle = css`
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  pointer-events: auto;
  overflow: visible;
`

export const NavItem = ({
  bar,
  index,
  staggerDelay,
  zIndexBase,
  selected,
  setSelected,
}: {
  bar: NavItemConfig
  index: number
  staggerDelay: number
  zIndexBase: number
  selected: string | null
  setSelected: Dispatch<SetStateAction<string | null>>
}) => {
  const itemRef = useRef<HTMLDivElement>(null)
  const [entered, setEntered] = useState(false)
  const { children, onClick, select = 'extend', ...barProps } = bar
  const isSelected = selected === bar.label
  const open = isSelected && entered && !!children?.length

  useEffect(() => {
    if (!isSelected) setEntered(false)
  }, [isSelected])

  return (
    <div ref={itemRef} className="nav-item" css={itemStyle}>
      {open && children && (
        <div
          css={nestedStyle}
          style={{
            bottom: `calc(100% - ${children.length}px)`,
            zIndex: zIndexBase + (index + 1) * bar.segments,
          }}
        >
          <BarGroup
            bars={children}
            staggerDelay={0}
            zIndexBase={zIndexBase + (index + 1) * bar.segments}
            enter="pop-slide"
            recoilFrom={itemRef}
          />
        </div>
      )}
      <Bar
        {...barProps}
        select={select}
        expanded={isSelected}
        staggerDelay={staggerDelay * index}
        zIndexBase={zIndexBase + index * bar.segments}
        onExtendComplete={() => setEntered(true)}
        onClick={() => {
          setSelected(current => (current === bar.label ? null : bar.label))
          onClick?.()
        }}
      />
    </div>
  )
}
