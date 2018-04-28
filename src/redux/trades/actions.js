import shortid from 'shortid'
import createAction from '../create-action'
import name from './.name'

const addTrade = trade => (dispatch, getState, { db }) => {
  const trades = (
    db.get(name)
      .filter(({ createdAt }) => new Date(createdAt) > new Date().setHours(0,0,0,0))
      .value()
  )

  const tradeWithId = {
    id: shortid.generate(),
    hand: trades.length + 1,
    status: 'trading',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...trade
  }

  dispatch(createAction('ADD_TRADE', tradeWithId))
}

const changeTradeStatus = (id, status) => (dispatch, getState, { db }) => {
  dispatch(createAction('CHANGE_TRADE_STATUS', { id, status }))
}

export default {
  addTrade,
  changeTradeStatus,
}
