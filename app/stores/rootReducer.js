import { combineReducers } from 'redux-immutablejs'
import { reducer as form } from 'redux-form'
import { UPDATE_LOCATION } from 'react-router-redux'
import { reducer as toastrReducer } from 'react-redux-toastr'
import Immutable from 'immutable'

import { userAuthReducer as userAuth } from './auth'
import { pigsReducer as pigs } from './pigs'
function toImmutable(reducer) {
  return (state, action) => {
    return Immutable.fromJS(reducer(state && state.toJS(), action))
  }
}

const initialState = Immutable.fromJS({
  location: undefined,
})

function immutableRouting(state = initialState, action) {
  if (action.type === UPDATE_LOCATION) {
    return state.merge({
      location: action.payload,
    })
  }

  return state
}

export default combineReducers({
  userAuth,
  pigs,
  routing: immutableRouting,
  form: toImmutable(form),
  toastr: toastrReducer,
})
