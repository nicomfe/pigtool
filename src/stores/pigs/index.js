import Immutable from 'immutable'
import { createSelector } from 'reselect'

import { fetchPigsFromApi, postSow } from '../api/pigs'

export const FETCH_REQUEST = '@@pigs/FETCH_REQUEST'
export const FETCH_SUCCESS = '@@pigs/FETCH_SUCCESS'
export const FETCH_FAILURE = '@@pigs/FETCH_FAILURE'
export const UPDATE_PIGS = '@@pigs/UPDATE_PIGS'
export const NEW_SOW = '@@pigs/NEW_SOW'

// ** ACTIONS ** //

export function retrieveingPigs() {
  return {
    type: FETCH_REQUEST,
  }
}

export function fetchFailure(err) {
  return {
    type: FETCH_FAILURE,
    payload: err,
  }
}

export function updatePigs(result) {
  return {
    type: FETCH_SUCCESS,
    payload: result.data,
  }
}

export function newSow(data) {
  return {
    type: NEW_SOW,
    payload: data,
  }
}

export function createSow(sow) {
  const copySow = sow
  return dispatch => {
    postSow(sow)
      .then((result) => {
        if (result.data && result.data.id) {
          copySow.id = result.data.id
          dispatch(newSow(copySow))
        }
      })
  }
}

export const fetchPigs = () => {
  return (dispatch) => {
    return fetchPigsFromApi().then((result) => {
      dispatch(updatePigs(result))
    }).catch((err) => {
      dispatch(fetchFailure(err))
    })
  }
}

// ** REDUCERS ** //

const defaultState = Immutable.fromJS({
  all: {},
})

export function pigsReducer(state = defaultState, action) {
  let newState = state
  switch (action.type) {
    case FETCH_SUCCESS:
      action.payload.forEach((pig) => {
        newState = newState.mergeIn(['all', pig.id], Immutable.fromJS(pig))
      })
      return newState.set('fetching', false)
    case FETCH_FAILURE:
      return state
        .set('fetching', false)
        .set('lastError', action.payload)
    case FETCH_REQUEST:
      return state.set('fetching', true)
    case NEW_SOW:
      const sow = Immutable.fromJS(action.payload)
      return state.setIn(['all', sow.get('id')], sow)
    default:
      return state

  }
}

// ** SELECTORS ** //
export const getPigs = (state) => state.get('pigs')

export const getAllPigs = createSelector(
  getPigs,
  (pigs) => pigs.get('all')
)
