/**
 * Copyright (c) Fixstars Corporation and Fixstars Amplify Corporation.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#111',
    },
  },
  typography: {
    h2: {
      fontSize: '1.5rem',
    },
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#111',
          color: '#f4f1f4',
          font: '10px',
        },
      },
    },
  },
})
