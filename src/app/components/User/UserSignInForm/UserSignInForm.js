import React, { useState } from 'react';
import './UserSigninForm.css';
import { useUserDispatch, userSignup } from '../user-context';

const UserSignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form className='sign-in-form'>
      <div>
        <label>Email:</label>
        <input
          className='sign-in-form__email'
          type='email'
          id='user-email'
          name='userEmail'
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          className='sign-in-form__password'
          type='password'
          id='user-password'
          name='userPassword'
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div className='sign-in-form__submit'>
        <button type='submit'>Sign In</button>
      </div>
    </form>
  );
};

export default UserSignInForm;
