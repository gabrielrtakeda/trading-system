import React from 'react'
import ReactDOM from 'react-dom'
import { Provider as ReduxProvider } from 'react-redux'
import Index from './pages/index'
import store from './store'

const App = () => (
  <ReduxProvider store={store}>
    <Index />
  </ReduxProvider>
)

ReactDOM.render(<App />, document.querySelector('#root'))
