import React, { useState } from 'react';
import './UserSignUpForm.css';
import { useUserDispatch, userSignup } from '../user-context';

const UserSignUpForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignedUp, setIsSignedUp] = useState(false);

  const userDispatch = useUserDispatch();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    //TODO: form validation
    try {
      await userSignup(userDispatch, {
        firstName,
        lastName,
        email,
        password,
      });
      setIsSignedUp(true);
    } catch (error) {
      console.error(`There was a problem: ${error}`);
    }
  };

  return (
    <>
      {isSignedUp ? (
        <div>Thanks for signing up. Sign in with the form above.</div>
      ) : (
        <form className='sign-up-form' onSubmit={handleSubmit}>
          <div>
            <label>First name:</label>
            <input
              className='sign-up-form__text'
              type='text'
              id='user-first-name'
              name='userFirstName'
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </div>
          <div>
            <label>Last name:</label>
            <input
              className='sign-up-form__text'
              type='text'
              id='user-last-name'
              name='userLastName'
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              className='sign-up-form__text'
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
              className='sign-up-form__text'
              type='password'
              id='user-password'
              name='userPassword'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div>
            <label>Confirm password:</label>
            <input
              className='sign-up-form__text'
              type='password'
              id='confirm-password'
              name='confirmPassword'
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </div>
          <div>
            <button className='sign-up-form__submit' type='submit'>
              Sign Up
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default UserSignUpForm;
