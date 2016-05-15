import Immutable from 'immutable'
import { browserHistory } from 'react-router'
import { toastr } from 'react-redux-toastr'
import { createSelector } from 'reselect'

import { validateLogin, validateToken } from '../api/auth'

// ** ACTIONS ** //
export const LOGIN_SUCCESS = '@@auth/LOGIN_SUCCESS'
export const LOGIN_FAIL = '@@auth/LOGIN_FAIL'
export const LOGOUT = '@@auth/LOGOUT'

function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  }
}

function loginFail() {
  return {
    type: LOGIN_FAIL,
  }
}

function logoutAction() {
  return {
    type: LOGOUT,
  }
}

export function logout() {
  return (dispatch) => {
    removeUserData()
    dispatch(logoutAction())
  }
}

function removeUserData() {
  localStorage.removeItem('userToken')
}

function getUserToken() {
  return localStorage.getItem('userToken')
}

export function checkTokenAuth(token = getUserToken()) {
  // If not token, then fail immedately
  if (!token) {
    return (dispatch) => {
      dispatch(loginFail())
      return Promise.resolve()
    }
  }

  return (dispatch) => {
    return validateToken(token).then((data) => {
      // if validate token. Then success
      dispatch(loginSuccess(data))
      // dispatch(setMenuStateFromLocalStorage())
    }).catch((err) => {
      // dispatch login fail
      dispatch(loginFail())
      // Handle error
      if (err && err.type && err.message) {
        toastr.error(err.type, err.message)
      } else {
        toastr.error('Error en login', 'Error desconocido')
      }
    })
  }
}

export const requestLogin = (creds) => {
  return (dispatch) => {
    return validateLogin(creds).then((data) => {
      const tempData = {
        ...data,
        token: data.guid,
        email: creds.email,
        role: 'Admin',
      }
      toastr.success('Login', 'Login Exitoso')
      localStorage.setItem('userToken', tempData.token)
      dispatch(loginSuccess(tempData))
      browserHistory.push('/home')
    }).catch((err) => {
      if (err && err.type && err.message) {
        toastr.error(err.type, err.message)
      } else {
        toastr.error('Error en login', 'Error desconocido')
      }
      dispatch(loginFail())
      return Promise.resolve()
    })
  }
}

// ** REDUCERS ** //
export function userAuthReducer(state = Immutable.fromJS({ isAuthenticated: false }), action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return state.set('isAuthenticated', true)
        .set('token', action.user.token)
        .set('user', Immutable.fromJS({ email: action.user.email }))
        .set('message', '')
    case LOGIN_FAIL:
      return state.set('isAuthenticated', false)
        .set('token', '')
        .set('user', Immutable.fromJS({}))
        .set('message', '')
    case LOGOUT:
      return state.set('isAuthenticated', false)
        .set('token', '')
    default:
      return state
  }
}

// ** SELECTORS ** //
export const getUserAuth = (state) => state.get('userAuth')

export const getIsAuthenticated = createSelector(
  getUserAuth,
  (userAuth) => userAuth.get('isAuthenticated')
)
