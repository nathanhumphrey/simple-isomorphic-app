import React, { useState } from 'react';

const UserSignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form>
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
        <button type="submit">Sign In</button>
      </div>
    </form>
  );
};

export default UserSignInForm;
