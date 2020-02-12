import React from 'react';
import Page from '../components/Page';
import UserSignUpForm from '../components/User/UserSignUpForm';

const SignUpPage = () => {
  return (
    <Page>
      <h1>Sign Up Page</h1>
      <p>Sign Up for a new account by completing the form below.</p>
      <UserSignUpForm />
    </Page>
  );
};

export default SignUpPage;
