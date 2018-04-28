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
import { TradeContext } from './TradeContext'

class Index extends React.Component {
  constructor(props) {
    super(props)

    this.setTrade = trade => this.setState(state => ({ trade }))
    this.setTradeAttr = attr => value => {
      this.setState(state => ({
        trade: {
          ...this.state.trade,
          [attr]: value
        }
      }))
    }

    this.state = {
      openModal: false,
      openDrawer: true,
      trade: {
        incomePercentual: 0,
        investiment: 0,
      },
      setTrade: this.setTrade,
      setTradeAttr: this.setTradeAttr,
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

        <TradeContext.Provider value={this.state}>
          <TradeFormModal
            open={openModal}
            onClose={this.handleModalClose}
          />
          <DrawerRight
            open={openDrawer}
            onDrawerClose={this.handleDrawerClose}
            onModalOpen={this.handleModalOpen}
          />
        </TradeContext.Provider>
      </AppRoot>
    )
  }
}

export default withRoot(Index)
