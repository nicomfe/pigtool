import thunk from 'redux-thunk'
import rootReducer from '../rootReducer'
import { applyMiddleware, compose, createStore } from 'redux'
import { syncHistory } from 'react-router-redux'
import createLogger from 'redux-logger'
import Immutable from 'immutable'

function withDevTools(middleware) {
  const devTools = window.devToolsExtension
    ? window.devToolsExtension()
    : f => f
  return compose(middleware, devTools)
}

export default function configureStore(initialState, browserHistory) {
  const routerMiddleware = syncHistory(browserHistory)

  const middleware = applyMiddleware(
    thunk,
    createLogger({
      stateTransformer: (state) => {
        return state.toJS()
      },
      collapsed: () => {
        return true
      },
    }),
    routerMiddleware,
  )

  const devToolsMiddleware = withDevTools(middleware)

  const store = devToolsMiddleware(createStore)(rootReducer, Immutable.fromJS(initialState))

  routerMiddleware.listenForReplays(store, (state) => {
    return state.getIn(['routing', 'location']).toJS()
  })

  if (module.hot) {
    module.hot.accept('../rootReducer', () => {
      const nextRootReducer = require('../rootReducer').default
      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}
