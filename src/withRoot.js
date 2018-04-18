import React from 'react'
import { connect } from 'react-redux'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import purple from 'material-ui/colors/purple'
import orange from 'material-ui/colors/orange'
import grey from 'material-ui/colors/grey'
import lightGreen from 'material-ui/colors/lightGreen'
import CssBaseline from 'material-ui/CssBaseline'

const common = {
  spacing: {
    drawerWidth: 550,
  }
}

// A theme with custom primary and secondary color.
// It's optional.
const dark = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: grey[50],
      main: grey[900],
      dark: grey[900],
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
      accent: lightGreen['A700'],
      light: lightGreen[700],
      main: lightGreen[800],
      dark: lightGreen[900],
    },
  },
  ...common,
})
const light = createMuiTheme({
  palette: {
    type: 'light',
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
      light: purple[50],
      main: purple[100],
      dark: purple[200],
    },
    success: {
      accent: lightGreen['A700'],
      light: lightGreen[50],
      main: lightGreen[100],
      dark: lightGreen[200],
    },
  },
  ...common,
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

  const mapStateToProps = state => ({
    darkMode: state.theme.darkMode,
  })

  return connect(mapStateToProps)(WithRoot)
}

export default withRoot
