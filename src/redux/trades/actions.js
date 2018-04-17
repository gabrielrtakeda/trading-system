import shortid from 'shortid'
import createAction from '../create-action'
import name from './.name'

const addTrade = trade => (dispatch, getState, { db }) => {
  const tradeWithId = {
    id: shortid.generate(),
    ...trade
  }

  db.get(name)
    .push(tradeWithId)
    .write()

  dispatch(createAction('ADD_TRADE', tradeWithId))

  return tradeWithId
}

const changeTradeStatus = (id, status) => (dispatch, getState, { db }) => {
  const tradeWithNewStatus = (
    db.get(name)
      .find({ id })
      .assign({ status })
      .write()
  )

  dispatch(createAction('CHANGE_TRADE_STATUS', tradeWithNewStatus))

  return tradeWithNewStatus
}

export default {
  addTrade,
  changeTradeStatus,
}
