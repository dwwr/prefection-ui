import type { Meta, StoryObj } from '@storybook/react'
import { Bar } from './Bar'

const meta: Meta<typeof Bar> = {
  title: 'Bar',
  component: Bar,
  render: () => (
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
      <Bar />
    </div>
  ),
}

export default meta

type Story = StoryObj<typeof Bar>

export const Default: Story = {} as Story
