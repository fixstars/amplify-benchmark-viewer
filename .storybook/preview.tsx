import React from 'react'

import type { Preview } from '@storybook/react'

import { ThemeProvider } from '@mui/material'
import { theme } from '../src/utils/theme'
import { withRouter } from 'storybook-addon-react-router-v6'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
    withRouter,
  ],
}

export default preview
