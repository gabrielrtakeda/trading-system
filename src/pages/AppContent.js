import React from 'react'
import classNames from 'classnames'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'

const styles = theme => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0,
    position: 'relative',
    overflowX: 'hidden',
    overflowY: 'auto',
    maxHeight: '100vh',
    marginRight: -theme.spacing.drawerWidth,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    marginRight: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  contentContainer: {
    paddingBottom: theme.spacing.unit * 8,
  },
})

const AppContent = ({ classes, children, openDrawer }) => (
  <main
    className={classNames(classes.content, {
      [classes.contentShift]: openDrawer,
    })}
  >
    <div className={classes.toolbar} />
    <Grid className={classes.contentContainer} container spacing={24}>
      {children}
    </Grid>
  </main>
)

export default withStyles(styles)(AppContent)
