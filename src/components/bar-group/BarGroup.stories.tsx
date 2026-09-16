import type { Meta, StoryObj } from '@storybook/react'
import { BarGroup } from './BarGroup'

const meta: Meta<typeof BarGroup> = {
  title: 'BarGroup',
  component: BarGroup,
  render: args => (
    <div
      style={{
        width: '100%',
        height: '100%',
        minHeight: '500px',
        paddingTop: '10rem',
        backgroundColor: '#f0c94a',
      }}
    >
      <BarGroup {...args} />
    </div>
  ),
}

export default meta

type Story = StoryObj<typeof BarGroup>

const bar = {
  duration: 150,
  segments: 4,
}

const bars = [
  { label: 'Foreword', color: '#7b7fd4', dotColor: '#7b4a9a' },
  { label: 'Hitchhiking', color: '#5ec8e8', dotColor: '#24c2f3' },
  { label: 'Maps', color: '#3cbf6e', dotColor: '#2b9e57' },
  { label: 'Guides', color: '#f0a03c', dotColor: '#d18932' },
  { label: 'Useless Info', color: '#8fd14f', dotColor: '#8a5aa8' },
  { label: 'Don’t Panic', color: '#8a5aa8', dotColor: '#8a5aa8' },
].map(row => ({
  ...bar,
  ...row,
}))

const group = (count: number): Story => ({
  args: {
    bars: bars.slice(0, count),
    staggerDelay: 500,
  },
})

export const Default = group(1)
export const TwoBars = group(2)
export const ThreeBars = group(3)
export const FourBars = group(4)
