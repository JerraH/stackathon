import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {
  composeWithDevTools
} from 'redux-devtools-extension'
import {default as user} from './user'
import {default as messages} from './messages'
import {default as userProfile} from './userProfile'
import {default as asks} from './asks'
import {default as recipient} from './recipient'
import {default as feed} from './feed'
import {default as comments} from './comments'

const reducer = combineReducers({user, messages, userProfile, asks, recipient, feed, comments})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({
    collapsed: true
  })
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './messages'
export * from './userProfile'
export * from './asks'
export * from './recipient'
export * from './comments'

