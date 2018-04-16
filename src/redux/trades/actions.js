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

export default {
  toggleTheme,
}
