import type { StorybookConfig } from '@storybook/react-vite'
import react from '@vitejs/plugin-react'

function isReactRefreshPlugin(plugin: unknown): boolean {
  if (!plugin) return false
  if (Array.isArray(plugin)) {
    return plugin.some(
      p => p && typeof p === 'object' && 'name' in p && String(p.name).includes('vite:react'),
    )
  }
  return (
    typeof plugin === 'object' &&
    'name' in plugin &&
    String(plugin.name).includes('vite:react')
  )
}

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
  ],
  framework: '@storybook/react-vite',
  async viteFinal(config) {
    config.plugins = [
      ...(config.plugins?.filter(plugin => !isReactRefreshPlugin(plugin)) ?? []),
      react({
        jsxImportSource: '@emotion/react',
      }),
    ]

    config.optimizeDeps = {
      ...config.optimizeDeps,
      include: [
        ...(config.optimizeDeps?.include ?? []),
        '@emotion/react/jsx-dev-runtime',
      ],
    }

    return config
  },
}

export default config
