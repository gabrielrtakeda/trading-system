import { combineReducers } from 'redux'
import { reducers as theme } from './theme'
import { reducers as trades } from './trades'
 
export default combineReducers({
  theme,
  trades,
})
