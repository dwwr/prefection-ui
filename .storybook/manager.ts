import { addons } from 'storybook/manager-api'

addons.setConfig({
  // Hide Controls / addon panel on first load; users can still open it.
  showPanel: false,
  layout: {
    showPanel: false,
  },
})
