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
import { runDropBelowEnter } from './dropBelowEnter'
import type { NavItem as NavItemConfig } from './types'
import { isMobileViewport } from './viewport'

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

const nestedMobileStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: fit-content;
  overflow: hidden;
  height: 0;

  .tip-item,
  .bar-group > .nav-item {
    transform: translateX(-15rem);
  }
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
  const nestedRef = useRef<HTMLDivElement>(null)
  const [mobile] = useState(() => isMobileViewport())
  const [entered, setEntered] = useState(false)
  const { children, onClick, select = 'extend', tip, ...barProps } = bar
  const isSelected = selected === bar.label
  const hasChildren = !!children?.length
  const mobileExpand = mobile && (!!tip || hasChildren)
  const openDesktop = !mobile && isSelected && entered && hasChildren
  const openMobile = mobile && isSelected && entered && mobileExpand
  const barSelect = mobileExpand ? 'none' : select
  const nestZ = zIndexBase + (index + 1) * bar.segments

  useEffect(() => {
    if (!isSelected) setEntered(false)
  }, [isSelected])

  useEffect(() => {
    if (!openMobile) return
    const rowHeight =
      itemRef.current?.querySelector<HTMLElement>(':scope > .bar')
        ?.offsetHeight || undefined
    return runDropBelowEnter(nestedRef, rowHeight)
  }, [openMobile, children, tip])

  return (
    <div ref={itemRef} className="nav-item" css={itemStyle}>
      {openDesktop && children && (
        <div
          css={nestedStyle}
          style={{
            bottom: `calc(100% - ${children.length}px)`,
            zIndex: nestZ,
          }}
        >
          <BarGroup
            bars={children}
            staggerDelay={0}
            zIndexBase={nestZ}
            enter="pop-slide"
            recoilFrom={itemRef}
          />
        </div>
      )}
      <Bar
        {...barProps}
        tip={tip}
        select={barSelect}
        expanded={isSelected}
        staggerDelay={staggerDelay * index}
        zIndexBase={zIndexBase + index * bar.segments}
        onExtendComplete={() => setEntered(true)}
        onClick={() => {
          setSelected(current => (current === bar.label ? null : bar.label))
          onClick?.()
        }}
      />
      {openMobile && (
        <div ref={nestedRef} css={nestedMobileStyle} style={{ zIndex: nestZ }}>
          {tip && (
            <div className="tip-item">
              <Bar
                label={tip.label}
                color={tip.color}
                dotColor={tip.dotColor ?? tip.color}
                duration={barProps.duration}
                segments={1}
                select="none"
                zIndexBase={nestZ}
              />
            </div>
          )}
          {hasChildren && (
            <BarGroup bars={children} staggerDelay={0} zIndexBase={nestZ} />
          )}
        </div>
      )}
    </div>
  )
}
