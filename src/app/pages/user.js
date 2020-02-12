import React from 'react';
import Page from '../components/Page';
import UserAccountView from '../components/User/UserAccountView';

const UserPage = () => {
  // dummy test user
  const user = {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jdoe@example.com'
  };

  return (
    <Page>
      <h1>User Page</h1>
      <UserAccountView user={user} />
    </Page>
  );
};

export default UserPage;
