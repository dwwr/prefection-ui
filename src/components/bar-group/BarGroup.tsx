/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { createScope, createTimeline } from 'animejs'
import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type RefObject,
  type SetStateAction,
} from 'react'
import { Bar, BarProps } from '../bar/Bar'

const groupStyle = css`
  position: relative;
`

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

      for (let i = 0; i < n; i++) {
        tl.set(items[i], {
          y: (n - i) * h,
          x: 0,
          opacity: 0,
          rotate: '0deg',
        })
      }

      if (tip) {
        tl.set(tip, { rotate: '0deg' })
      }

      // Closest to parent first, building the stack upward
      for (let i = n - 1; i >= 0; i--) {
        const stacked = n - i
        const droop = `${stacked * droopStep}deg`
        tl.add(items[i], { opacity: 1, x: '15rem', duration: 70 })
        if (parent) {
          tl.add(parent, { x: '-0.5rem', duration: 70 }, '<')
          tl.add(parent, { x: 0, duration: 25 })
        }
        tl.add(items[i], { x: 0, y: 0, duration: 25 })

        const settled = [items[i], ...Array.from(items).slice(i + 1)]
        if (tip) settled.unshift(tip)
        tl.add(settled, { rotate: droop, duration: 140 }, '<')
      }
    })

    return () => {
      scope.revert()
    }
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

const NavItem = ({
  bar,
  index,
  staggerDelay,
  zIndexBase,
  selected,
  setSelected,
}: {
  bar: NavItem
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

export interface NavItem extends Omit<
  BarProps,
  'staggerDelay' | 'zIndexBase' | 'expanded' | 'onExtendComplete'
> {
  children?: NavItem[]
}

export interface BarGroupProps {
  bars: NavItem[]
  staggerDelay?: number
  zIndexBase?: number
  enter?: 'pop-slide'
  recoilFrom?: RefObject<HTMLDivElement | null>
}
