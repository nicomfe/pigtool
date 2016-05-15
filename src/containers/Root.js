import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import ReduxToastr from 'react-redux-toastr'
import getRoutes from '../routes'

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <div style={{ height: '100%' }}>
          <Router history={this.props.history} children={getRoutes(this.props.store)} />
          <ReduxToastr timeOut={3000} />
        </div>
      </Provider>
    )
  }
}

Root.propTypes = {
  history: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
}
