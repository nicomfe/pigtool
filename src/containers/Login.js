import React from 'react'
import { connect } from 'react-redux'

import { requestLogin } from '../stores/auth'
import Login from '../components/login'

class LoginContainer extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
    }
  }

  handleChange = (value, e) => {
    this.setState({
      [e.target.name]: value,
    })
  }

  handleLogin = () => {
    const { email, password } = this.state
    this.props.login({ email, password })
  }

  render() {
    return (<div>
      <Login handleChange={this.handleChange} handleLogin={this.handleLogin} {...this.state} />
    </div>)
  }
}

const mapStateToProps = () => ({

})
const mapDispatchToProps = (dispatch) => ({
  login: (creds) => { dispatch(requestLogin(creds)) },
})

LoginContainer.propTypes = {
  login: React.PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
