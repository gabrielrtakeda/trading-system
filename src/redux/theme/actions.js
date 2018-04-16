import createAction from '../create-action'
import name from './.name'

const toggleTheme = (type) => (dispatch, getState, { db }) => {
  const { theme: { darkMode } } = getState()

  db.set(`${name}.darkMode`, !darkMode)
    .write()

  dispatch(createAction('TOGGLE_THEME', !darkMode))
}

export default {
  toggleTheme,
}
