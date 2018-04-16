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
  hand: 3,
  asset: 'EUR/USD',
  incomePercentual: 0.78,
  investiment: 385.44,
  result: 666.08,
  gain: 300.64,
  retainGain: 180.39,
  status: 'trading', // ['trading', 'gain', 'loss']
  createdAt: now,
  updatedAt: now,
}, {
  id: shortid.generate(),
  hand: 2,
  asset: 'EUR/USD',
  incomePercentual: 0.78,
  investiment: 385.44,
  result: 686.08,
  gain: 300.64,
  retainGain: 180.39,
  status: 'gain', // ['trading', 'gain', 'loss']
  createdAt: new Date(now - 1 * 1000 * 60),
  updatedAt: new Date(now - 1 * 1000 * 60),
}, {
  id: shortid.generate(),
  hand: 1,
  asset: 'EUR/USD',
  incomePercentual: 0.78,
  investiment: 385.44,
  result: 686.08,
  gain: 300.64,
  retainGain: 180.39,
  status: 'loss', // ['trading', 'gain', 'loss']
  createdAt: new Date(now - 2 * 1000 * 60),
  updatedAt: new Date(now - 2 * 1000 * 60),
}, {
  id: shortid.generate(),
  hand: 1,
  asset: 'EUR/USD',
  incomePercentual: 0.78,
  investiment: 385.44,
  result: 555.08,
  gain: 300.64,
  retainGain: 180.39,
  status: 'trading', // ['trading', 'gain', 'loss']
  createdAt: new Date(now - 1 * 1000 * 60 * 60 * 24),
  updatedAt: new Date(now - 1 * 1000 * 60 * 60 * 24),
}]

db.defaults({ [name]: initialState }).write()

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TRADE':
      return [...state, action.payload]

    default:
      return state
  }
}
