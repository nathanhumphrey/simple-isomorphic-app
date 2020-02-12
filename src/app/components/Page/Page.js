import React from 'react';
import PropTypes from 'prop-types';
import PageNav from './PageNav';
import PageHeader from './PageHeader';
import UserSignInForm from '../User/UserSignInForm';
import { routes } from '../../routes';

const Page = ({ children }) => {
  return (
    <div className="page-container">
      <PageHeader>
        <PageNav routes={routes} />
        <UserSignInForm />
      </PageHeader>
      <main>{children}</main>
    </div>
  );
};

Page.propTypes = {
  children: PropTypes.node
};

export default Page;
