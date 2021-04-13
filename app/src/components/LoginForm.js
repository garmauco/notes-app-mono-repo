import React from 'react'
import Togglable from './Togglable'
import PropTypes from 'prop-types'
export default function LoginForm({ handleSubmit, username, password, handleUsernameChange, handlePasswordChange }) {

  return (
    <Togglable buttonLabel="Show Login">
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={username}
          name='Username'
          placeholder='Username'
          onChange={handleUsernameChange}
        />
        <input
          type='password'
          value={password}
          name='Password'
          placeholder='Password'
          onChange={handlePasswordChange}
        />
        <button id="form-button-login">Login</button>
      </form>
    </Togglable>
  )
  LoginForm.prototype = {
    handleSubmit: PropTypes.func.isRequired,
    username: PropTypes.string
  }

}