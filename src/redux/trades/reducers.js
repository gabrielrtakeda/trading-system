import db from '../../services/db'
import name from './.name'

const date = new Date().setHours(0,0,0,0)

const initialState = (
  db.get('trades')
    .filter(({ createdAt }) => new Date(createdAt) > date)
    .orderBy('createdAt', 'desc')
    .value()
)

db.defaults({ [name]: initialState }).write()

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'ADD_TRADE':
      db.get(name)
        .unshift(payload)
        .write()
    break

    case 'CHANGE_TRADE_STATUS':
      db.get(name)
        .find({ id: payload.id })
        .assign({ status: payload.status })
        .write()
    break

    default: (f => f)()
  }

  return (
    db.get('trades')
      .filter(({ createdAt }) => new Date(createdAt) > date)
      .value()
  )
}
