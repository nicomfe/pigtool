import React from 'react'
import { Route, Redirect } from 'react-router'

import AppContainer from 'containers/App'
import LoginContainer from 'containers/Login'
import MainContainer from 'containers/main'
import PigsContainer from 'containers/pigs'

import { checkTokenAuth, getIsAuthenticated } from 'stores/auth'

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const state = store.getState()
      const isAuthenticated = getIsAuthenticated(state)
      if (!isAuthenticated) {
        // Not authenticated. Redirect to login page
        replace('/login')
      }
      // Allowed. So let them continue
      cb()
    }

    const state = store.getState()
    const isAuthenticated = getIsAuthenticated(state)
    if (!isAuthenticated) {
      store.dispatch(checkTokenAuth())
        .then(() => {
          checkAuth()
        })
    } else {
      checkAuth()
    }
  }

  return (
    <Route component={AppContainer}>
      { /* Routes requiring login */ }
      <Route onEnter={requireLogin} path="/home" component={MainContainer}>
        <Route path="/sows" component={PigsContainer} />
      </Route>
      <Route path="/login" component={LoginContainer} />
      <Redirect from="*" to="/home" />
    </Route>
  )
}
