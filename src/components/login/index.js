import React from 'react'
import Input from 'react-toolbox/lib/input'
import Button from 'react-toolbox/lib/button'

import css from './styles.scss'

const Login = (props) => {
  const { email, password, handleChange, handleLogin } = props
  return (
    <div className={css.loginForm}>
      <div>
        <Input
          type="text"
          name="email"
          label="Email"
          icon="person"
          value={email}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          label="Password"
          icon="lock"
          value={password}
          onChange={handleChange}
        />
      </div>
      <div>
        <Button raised primary onClick={handleLogin}>Login</Button>
      </div>
    </div>
  )
}

Login.propTypes = {
  email: React.PropTypes.string,
  password: React.PropTypes.string,
  handleChange: React.PropTypes.func.isRequired,
  handleLogin: React.PropTypes.func.isRequired,
}

export default Login
