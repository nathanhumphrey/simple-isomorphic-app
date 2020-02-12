import React, { useState } from 'react';

const UserSignUpForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <form>
      <div>
        <label>First name:</label>
        <input
          type="text"
          id="user-first-name"
          name="userFirstName"
          value={firstName}
          onChange={event => setFirstName(event.target.value)}
        />
      </div>
      <div>
        <label>Last name:</label>
        <input
          type="text"
          id="user-last-name"
          name="userLastName"
          value={lastName}
          onChange={event => setLastName(event.target.value)}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          id="user-email"
          name="userEmail"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          id="user-password"
          name="userPassword"
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
      </div>
      <div>
        <label>Confirm password:</label>
        <input
          type="password"
          id="confirm-password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={event => setConfirmPassword(event.target.value)}
        />
      </div>
      <div>
        <button type="submit">Sign Up</button>
      </div>
    </form>
  );
};

export default UserSignUpForm;
