const initialState = {
  darkMode: true
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return { ...state, darkMode: !state.darkMode }

    default:
      return state
  }
}
