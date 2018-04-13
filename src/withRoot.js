import React from 'react'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import purple from 'material-ui/colors/purple'
import orange from 'material-ui/colors/orange'
import grey from 'material-ui/colors/grey'
import lightGreen from 'material-ui/colors/lightGreen'
import green from 'material-ui/colors/green'
import CssBaseline from 'material-ui/CssBaseline'

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: grey[800],
      main: grey[900],
      dark: grey['100%'],
    },
    secondary: {
      light: orange[400],
      main: orange[600],
      dark: orange[700],
    },
    error: {
      accent: purple['A400'],
      light: purple[500],
      main: purple[800],
      dark: purple[900],
    },
    success: {
      light: lightGreen[500],
      main: lightGreen[900],
      dark: green[900],
    },
  },
})

function withRoot(Component) {
  function WithRoot(props) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <MuiThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    )
  }

  return WithRoot
}

export default withRoot
