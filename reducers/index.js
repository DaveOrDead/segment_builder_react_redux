import { combineReducers } from 'redux'
import counter from './counter'
import segmentBuilder from './segmentbuilder'

const rootReducer = combineReducers({
  counter,
  segmentBuilder
})

export default rootReducer
