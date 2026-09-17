import type { Meta, StoryObj } from '@storybook/react'
import { StoryPlayground } from '../story-playground/StoryPlayground'
import { Bar } from './Bar'

const meta: Meta<typeof Bar> = {
  title: 'Bar',
  component: Bar,
  render: args => (
    <StoryPlayground>
      <Bar {...args} />
    </StoryPlayground>
  ),
}

export default meta

type Story = StoryObj<typeof Bar>

export const Default: Story = {
  args: {
    color: 'blue',
    dotColor: 'lightblue',
    duration: 200,
    label: 'Label',
    segments: 5,
  },
}

export const OnClickTest: Story = {
  args: {
    color: 'blue',
    dotColor: 'lightblue',
    duration: 200,
    label: 'Label',
    segments: 5,
    select: 'extend',
    onClick: () => {
      console.log('clicked')
    },
  },
}
