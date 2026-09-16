import type { Meta, StoryObj } from '@storybook/react'
import { Bar } from './Bar'

const meta: Meta<typeof Bar> = {
  title: 'Bar',
  component: Bar,
  render: args => (
    <div
      style={{
        width: '100%',
        height: '100%',
        minHeight: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
        boxSizing: 'border-box',
      }}
    >
      <Bar {...args} />
    </div>
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
