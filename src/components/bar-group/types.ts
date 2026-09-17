import type { RefObject } from 'react'
import type { BarProps } from '../bar/Bar'

export interface NavItem
  extends Omit<
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
