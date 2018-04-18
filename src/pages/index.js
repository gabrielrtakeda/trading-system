import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'

import withRoot from '../withRoot'
import TradeFormModal from './TradeFormModal'
import AppBar from './AppBar'
import DrawerRight from './DrawerRight'
import StaticDataSection from './StaticDataSection'
import DynamicDataSection from './DynamicDataSection'
import TradesTableSection from './TradesTableSection'

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
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

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openModal: false,
      openDrawer: true,
    }
  }

  handleModalClose = () => this.setState({ openModal: false })
  handleModalOpen = () => this.setState({ openModal: true })
  handleDrawerClose = () => this.setState({ openDrawer: false })
  handleDrawerOpen = () => this.setState({ openDrawer: true })

  render() {
    const { classes } = this.props
    const { openModal, openDrawer } = this.state

    return (
      <div className={classes.root}>
        <AppBar
          title='Trading System'
          open={openDrawer}
          onDrawerOpen={this.handleDrawerOpen}
        />

        <main
          className={classNames(classes.content, {
            [classes.contentShift]: openDrawer,
          })}
        >
          <div className={classes.toolbar} />
          <Grid className={classes.contentContainer} container spacing={24}>
            <StaticDataSection />
            <DynamicDataSection />
            <TradesTableSection />
          </Grid>
        </main>

        <DrawerRight
          open={openDrawer}
          onDrawerClose={this.handleDrawerClose}
          onModalOpen={this.handleModalOpen}
        />

        <TradeFormModal
          open={openModal}
          onClose={this.handleModalClose}
        />
      </div>
    )
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withRoot(withStyles(styles)(Index))
