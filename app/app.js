import React from 'react'
import ReactDOM from 'react-dom'
import { browserHistory } from 'react-router'
import configureStore from './stores/config/configureStore'
import Root from './containers/Root'

const store = configureStore({}, browserHistory)

// Render the React application to the DOM
ReactDOM.render(
  <Root history={browserHistory} store={store} />,
  document.getElementById('root')
)
