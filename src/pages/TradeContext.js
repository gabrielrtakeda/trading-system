import React from 'react'

export const TradeContext = React.createContext({
  openModal: false,
  openDrawer: true,
  trade: {
    incomePercentual: 0,
    investiment: 0,
  },
  setTrade: () => {},
  setTradeAttr: () => {},
})
