import { createStore, combineReducers, applyMiddleware } from 'redux'
import promiseMiddleware from 'redux-promise-middleware'
import accReducer from './ducks/accReducer.js'
import appReducer from './ducks/appReducer.js'

import { composeWithDevTools } from 'redux-devtools-extension'

const rootReducer = combineReducers ({
    accReducer,
    appReducer
})

export default createStore(rootReducer, composeWithDevTools(applyMiddleware(promiseMiddleware)))