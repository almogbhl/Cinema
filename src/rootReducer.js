import { combineReducers } from 'redux'

import mainReducer from './components/Main/Main.reducer'

const rootReducer = combineReducers({
  main : mainReducer
})

export default rootReducer