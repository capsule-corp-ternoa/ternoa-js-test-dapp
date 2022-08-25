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
  components: {
    // Inputs
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            background: '#191939',
            border: 'solid 0.2rem transparent',
            boxShadow: '0 10rem 1rem #0e0e23 inset',
            outline: 'none',
            transition: 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1) !important',
          },
          '&.Mui-focused': {
            '& .MuiOutlinedInput-notchedOutline': {
              border: 'solid 0.2rem transparent',
              background: 'linear-gradient(90deg, #ff8500 0%, #ff0062 33.3%, #cb06ed 68.16%, #004fff 99.9%)',
              backgroundOrigin: 'border-box',
            },
          },
        },
      },
    },
  },
})
