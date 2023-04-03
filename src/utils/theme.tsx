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
