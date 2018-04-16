import db from '../../services/db'
import name from './.name'

const dbState = db.has('theme').value() && db.get('theme').value()
const initialState = dbState || {
  darkMode: true
}

db.defaults({ [name]: initialState }).write()

export default (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return { ...state, darkMode: action.payload }

    default:
      return state
  }
}
