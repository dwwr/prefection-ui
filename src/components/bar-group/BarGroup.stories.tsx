import type { Meta, StoryObj } from '@storybook/react'
import { StoryPlayground } from '../story-playground/StoryPlayground'
import { BarGroup } from './BarGroup'

const meta: Meta<typeof BarGroup> = {
  title: 'BarGroup',
  component: BarGroup,
  render: args => (
    <StoryPlayground>
      <BarGroup {...args} />
    </StoryPlayground>
  ),
}

export default meta

type Story = StoryObj<typeof BarGroup>

const bar = {
  duration: 150,
  segments: 5,
}

const bars = [
  {
    label: 'Foreword',
    color: '#6752a1',
    dotColor: '#53418a',
  },
  { label: 'Hitchhiking', color: '#28c4b4', dotColor: '#1fa89a' },
  { label: 'Maps', color: '#74b72e', dotColor: '#5f9624' },
  { label: 'Guides', color: '#c88736', dotColor: '#a86f2a' },
  { label: 'Useless Info', color: '#a15252', dotColor: '#874343' },
  { label: 'Don’t Panic', color: '#702963', dotColor: '#5a2050' },
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

const child = {
  duration: 100,
  segments: 1,
  select: 'none' as const,
}

export const Default = group(1)
export const TwoBars = group(2)
export const ThreeBars = group(3)
export const FourBars = group(4)

export const Nested: Story = {
  args: {
    staggerDelay: 500,
    bars: [
      bars[0],
      {
        ...bars[1],
        tip: {
          label: 'Intro',
          color: '#7dd3f0',
          dotColor: '#24c2f3',
        },
        children: [
          { ...child, label: 'Who', color: '#cfd6d4', dotColor: '#b7bebc' },
          { ...child, label: 'What', color: '#e07a5f', dotColor: '#c45f46' },
          { ...child, label: 'Why', color: '#8a5aa8', dotColor: '#734a8e' },
        ],
      },
      bars[2],
    ],
  },
}

export const TableOfContents: Story = {
  args: {
    staggerDelay: 120,
    bars: [
      {
        ...bar,
        label: 'Foreword',
        color: '#6752a1',
        dotColor: '#53418a',
      },
      {
        ...bar,
        label: 'Hitchhiking',
        color: '#28c4b4',
        dotColor: '#1fa89a',
        tip: {
          label: 'The Guide',
          color: '#41a5ee',
          dotColor: '#2f58d4',
        },
      },
      {
        ...bar,
        label: 'Maps',
        color: '#74b72e',
        dotColor: '#5f9624',
      },
      {
        ...bar,
        label: 'Guides',
        color: '#c88736',
        dotColor: '#a86f2a',
      },
      {
        ...bar,
        label: 'Useless Info',
        color: '#a15252',
        dotColor: '#874343',
        tip: {
          label: 'Introduction',
          color: '#5ab467',
          dotColor: '#4a9855',
        },
        children: [
          { ...child, label: 'Who', color: '#74b72e', dotColor: '#5f9624' },
          { ...child, label: 'What', color: '#c88736', dotColor: '#a86f2a' },
          { ...child, label: 'Why', color: '#a15252', dotColor: '#874343' },
          { ...child, label: 'Where', color: '#702963', dotColor: '#5a2050' },
          { ...child, label: 'When', color: '#6752a1', dotColor: '#53418a' },
          { ...child, label: 'How', color: '#41a5ee', dotColor: '#2f8fd4' },
        ],
      },
      {
        ...bar,
        label: 'Don’t Panic',
        color: '#702963',
        dotColor: '#5a2050',
      },
    ],
  },
}
