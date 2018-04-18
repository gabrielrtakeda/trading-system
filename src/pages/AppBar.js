import React from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Tooltip from 'material-ui/Tooltip'
import Switch from 'material-ui/Switch'
import IconButton from 'material-ui/IconButton'
import FlashOnIcon from '@material-ui/icons/FlashOn'

import { actions as ThemeActions } from '../redux/theme'

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  appBarShift: {
    marginRight: theme.spacing.drawerWidth,
    width: `calc(100% - ${theme.spacing.drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuTitle: {
    flex: 1,
  },
  hide: {
    display: 'none',
  },
})

const Component = ({ classes, title, open, onDrawerOpen, darkMode, toggleTheme }) => (
  <AppBar
    position='absolute'
    className={classNames(classes.appBar, {
      [classes.appBarShift]: open
    })}
  >
    <Toolbar>
      <Typography variant='title' color='inherit' className={classes.menuTitle}>
        {title}
      </Typography>
      <Tooltip id='tooltip-darkmode' title='Dark Mode'>
        <Switch
          checked={darkMode}
          onChange={toggleTheme}
        />
      </Tooltip>
      <Tooltip
        id='tooltip-simulations'
        title='Simulations'
      >
        <IconButton
          className={classNames(open && classes.hide)}
          aria-owns={open ? 'menu-appbar' : null}
          aria-haspopup='true'
          onClick={onDrawerOpen}
          color='inherit'
        >
          <FlashOnIcon />
        </IconButton>
      </Tooltip>
    </Toolbar>
  </AppBar>
)

const mapStateToProps = state => ({
  darkMode: state.theme.darkMode,
})

export default connect(mapStateToProps, ThemeActions)(
  withStyles(styles)(Component)
)
