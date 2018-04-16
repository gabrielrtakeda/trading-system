import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { createStore } from 'redux'
import Index from './pages/index'
import rootReducer from './reducers'

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
)

const App = () => (
  <ReduxProvider store={store}>
    <Index />
  </ReduxProvider>
)

ReactDOM.render(<App />, document.querySelector('#root'))
