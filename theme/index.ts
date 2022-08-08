import { createTheme } from '@mui/material/styles'

export const appTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#004fff',
    },
  },
  typography: {
    fontFamily: 'Airbnb Cereal App Book',
    htmlFontSize: 10,
    h1: {
      fontSize: '3.2rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '2.4rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.6rem',
      fontWeight: 600,
    },
    body1: {
      lineHeight: 2,
    },
  },
})
