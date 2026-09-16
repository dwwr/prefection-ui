import { Bar, BarProps } from '../bar/Bar'

export const BarGroup = ({ bars, staggerDelay = 0 }: BarGroupProps) => {
  return (
    <div className="bar-group">
      {bars.map((bar, index) => (
        <Bar
          key={index}
          {...bar}
          staggerDelay={staggerDelay * index}
          zIndexBase={index * bar.segments}
        />
      ))}
    </div>
  )
}

export interface BarGroupProps {
  bars: BarProps[]
  staggerDelay?: number
}
