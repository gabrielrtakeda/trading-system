import React from 'react'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
})

const AppRoot = ({ classes, children }) => (
  <div className={classes.root}>
    {children}
  </div>
)

export default withStyles(styles)(AppRoot)
