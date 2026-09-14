/** @jsxImportSource react */
import type { Preview } from '@storybook/react'
import React from 'react'
import '../src/components/global_styles.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'fullscreen',
    backgrounds: {
      disable: true,
    },
  },
  decorators: [
    (Story: React.FC) => (
      <div>
        <Story />
      </div>
    ),
  ],
}

export default preview
