import React, { useReducer } from 'react';
import axios from 'axios';
import formValidation from './FormValidation';
import inputErrors from './InputErrors';
import { Redirect } from 'react-router-dom';

const Login = () => {

  const initialState = {
    username: '',
    password: ''
  };

  const {handleSubmit, handleChange, handleBlur, values, errors, isSubmitting} = formValidation(initialState, inputErrors);

  const axiosFunc = () => {
    axios.post(`/users/auth`, values )
      .then(res => {
        // Save JWT token in localStorage
        localStorage.setItem('auth-token', res.data);

        // Redirect user to admin page
        window.location = '/admin';
      })
      .catch(err => {
        console.log(err);
        alert('Credentials do not match our records')
      })
  }

  return (
    <form onSubmit={e => {handleSubmit(e, axiosFunc)}}>
      <div className="login-buttons">
        <input type="text" name="username" value={values.username} onChange={handleChange} placeholder="Username" className="user-input"/>
        {errors.email && <p className="error-text">{errors.email}</p>}
        <input type="password" name="password" value={values.password} onChange={handleChange} placeholder="Password" autoComplete="password" className="user-input"/>
        {errors.password && <p className="error-text">{errors.password}</p>}
        <button type="submit" disabled={isSubmitting} className="user-submit">Login!</button>
      </div>
    </form>
  )
}

export default Login