import thunk from 'redux-thunk'
import { applyMiddleware, createStore } from 'redux'
import { syncHistory } from 'react-router-redux'
import Immutable from 'immutable'

import rootReducer from '../rootReducer'

export default function configureStore(initialState, browserHistory) {
  return createStore(
    rootReducer,
    Immutable.fromJS(initialState),
    applyMiddleware(thunk, syncHistory(browserHistory)),
  )
}
