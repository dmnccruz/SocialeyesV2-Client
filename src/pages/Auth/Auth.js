import React, { useState } from 'react';
import './Auth.css';
import Logo from '../../img/logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { logIn, signUp } from '../../actions/AuthAction';

const initialData = {
  firstname: '',
  lastname: '',
  username: '',
  password: '',
  confirmpass: '',
};

const Auth = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.authReducer.loading);
  const [isSignUp, setIsSignUp] = useState(false);
  const [data, setData] = useState(initialData);
  const [confirmPass, setConfirmPass] = useState(true);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      data.password === data.confirmpass
        ? dispatch(signUp(data))
        : setConfirmPass(false);
    } else {
      dispatch(logIn(data));
    }
  };

  const resetForm = () => {
    setConfirmPass(true);
    setData(initialData);
  };

  return (
    <div className='Auth'>
      {/* Left Side */}
      <div className='a-left'>
        <img src={Logo} alt='' />
        <div className='Webname'>
          <h1>Socialeyes</h1>
          <h6>Explore the ideas throughout the world.</h6>
        </div>
      </div>
      {/* Right Side */}
      <div className='a-right'>
        <form className='infoForm authForm' onSubmit={handleSubmit}>
          <h3>{isSignUp ? 'Sign up' : 'Login'}</h3>
          {isSignUp && (
            <div>
              <input
                type='text'
                placeholder='First Name'
                className='infoInput'
                name='firstname'
                onChange={handleChange}
                value={data.firstname}
              />
              <input
                type='text'
                placeholder='Last Name'
                className='infoInput'
                name='lastname'
                onChange={handleChange}
                value={data.lastname}
              />
            </div>
          )}
          <div>
            <input
              type='text'
              placeholder='Username'
              className='infoInput'
              name='username'
              onChange={handleChange}
              value={data.username}
            />
          </div>
          <div>
            <input
              type='password'
              placeholder='Password'
              className='infoInput'
              name='password'
              onChange={handleChange}
              value={data.password}
            />
            {isSignUp && (
              <input
                type='password'
                placeholder='Confirm Password'
                className='infoInput'
                name='confirmpass'
                onChange={handleChange}
                value={data.confirmpass}
              />
            )}
          </div>
          <span
            style={{
              display: confirmPass ? 'none' : 'block',
              color: 'red',
              fontSize: '12px',
              alignSelf: 'flex-end',
              marginRight: '5px',
            }}
          >
            * Passwords are not the same.
          </span>
          <div>
            <span
              style={{ fontSize: '12px', cursor: 'pointer' }}
              onClick={() => {
                resetForm();
                setIsSignUp(!isSignUp);
              }}
            >
              {isSignUp
                ? 'Already have an account? Login.'
                : "Don't have an account? Sign up."}
            </span>
          </div>
          <button
            className='button infoButton'
            type='submit'
            disabled={loading}
          >
            {loading ? 'Loading' : isSignUp ? 'Sign up' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
