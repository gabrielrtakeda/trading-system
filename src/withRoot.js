import React from 'react'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import purple from 'material-ui/colors/purple'
import orange from 'material-ui/colors/orange'
import grey from 'material-ui/colors/grey'
import lightGreen from 'material-ui/colors/lightGreen'
import CssBaseline from 'material-ui/CssBaseline'

// A theme with custom primary and secondary color.
// It's optional.
const dark = createMuiTheme({
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
      light: purple[700],
      main: purple[800],
      dark: purple[900],
    },
    success: {
      light: lightGreen[700],
      main: lightGreen[800],
      dark: lightGreen[900],
    },
  },
})
const light = createMuiTheme({
  palette: {
    type: 'light',
    error: {
      accent: purple['A400'],
      light: purple[200],
      main: purple[300],
      dark: purple[400],
    },
    success: {
      light: lightGreen[200],
      main: lightGreen[300],
      dark: lightGreen[400],
    },
  },
})

function withRoot(Component) {
  function WithRoot(props) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <MuiThemeProvider theme={props.darkMode ? dark : light}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    )
  }

  return WithRoot
}

export default withRoot
