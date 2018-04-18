import shortid from 'shortid'
import db from '../../services/db'
import name from './.name'

const now = new Date()
const date = new Date().setHours(0,0,0,0)

const dbState = (
  db.has('trades').value() &&
  db.get('trades')
    .filter(({ createdAt }) => new Date(createdAt) > date)
    .orderBy('createdAt', 'desc')
    .value()
)

const initialState = dbState || [{
  id: shortid.generate(),
  hand: 6,
  asset: 'EURUSD',
  incomePercentual: 0.80,
  investiment: 385.44,
  status: 'trading', // ['trading', 'gain', 'loss', 'doji']
  createdAt: now,
  updatedAt: now,
},{
  id: shortid.generate(),
  hand: 5,
  asset: 'EURUSD',
  incomePercentual: 0.80,
  investiment: 385.44,
  status: 'trading', // ['trading', 'gain', 'loss', 'doji']
  createdAt: now,
  updatedAt: now,
},{
  id: shortid.generate(),
  hand: 4,
  asset: 'EURUSD',
  incomePercentual: 0.80,
  investiment: 385.44,
  status: 'trading', // ['trading', 'gain', 'loss', 'doji']
  createdAt: now,
  updatedAt: now,
}, {
  id: shortid.generate(),
  hand: 3,
  asset: 'EURUSD',
  incomePercentual: 0.80,
  investiment: 385.44,
  status: 'gain', // ['trading', 'gain', 'loss', 'doji']
  createdAt: new Date(now - 1 * 1000 * 60),
  updatedAt: new Date(now - 1 * 1000 * 60),
}, {
  id: shortid.generate(),
  hand: 2,
  asset: 'EURUSD',
  incomePercentual: 0.80,
  investiment: 385.44,
  status: 'loss', // ['trading', 'gain', 'loss', 'doji']
  createdAt: new Date(now - 2 * 1000 * 60),
  updatedAt: new Date(now - 2 * 1000 * 60),
}, {
  id: shortid.generate(),
  hand: 1,
  asset: 'EURUSD',
  incomePercentual: 0.80,
  investiment: 385.44,
  status: 'doji', // ['trading', 'gain', 'loss', 'doji']
  createdAt: new Date(now - 3 * 1000 * 60),
  updatedAt: new Date(now - 3 * 1000 * 60),
}, {
  id: shortid.generate(),
  hand: 1,
  asset: 'EURUSD',
  incomePercentual: 0.80,
  investiment: 385.44,
  status: 'trading', // ['trading', 'gain', 'loss', 'doji']
  createdAt: new Date(now - 1 * 1000 * 60 * 60 * 24),
  updatedAt: new Date(now - 1 * 1000 * 60 * 60 * 24),
}]

db.defaults({ [name]: initialState }).write()

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TRADE':
      return [action.payload, ...state]

    case 'CHANGE_TRADE_STATUS':
      return state.map(trade => (
        trade.id === action.payload.id ?
          action.payload :
          trade
      ))

    default:
      return state
  }
}
