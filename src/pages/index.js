import React from 'react'

import withRoot from '../withRoot'
import AppRoot from './AppRoot'
import AppBar from './AppBar'
import AppContent from './AppContent'
import StaticDataSection from './StaticDataSection'
import DynamicDataSection from './DynamicDataSection'
import TradesTableSection from './TradesTableSection'
import TradeFormModal from './TradeFormModal'
import DrawerRight from './DrawerRight'

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
    const { openModal, openDrawer } = this.state

    return (
      <AppRoot>
        <AppBar
          title='Trading System'
          open={openDrawer}
          onDrawerOpen={this.handleDrawerOpen}
        />

        <AppContent openDrawer={openDrawer}>
          <StaticDataSection />
          <DynamicDataSection />
          <TradesTableSection />
        </AppContent>

        <DrawerRight
          open={openDrawer}
          onDrawerClose={this.handleDrawerClose}
          onModalOpen={this.handleModalOpen}
        />

        <TradeFormModal
          open={openModal}
          onClose={this.handleModalClose}
        />
      </AppRoot>
    )
  }
}

export default withRoot(Index)
