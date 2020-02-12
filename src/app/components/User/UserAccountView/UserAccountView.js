import React from 'react';
import PropTypes from 'prop-types';

const UserAccountView = ({ user }) => {
  return (
    <div>
      <h2>User Account Details</h2>
      <p>
        <b>First Name: </b>
        {user.firstName}
      </p>
      <p>
        <b>Last Name: </b>
        {user.lastName}
      </p>
      <p>
        <b>Email: </b>
        {user.email}
      </p>
    </div>
  );
};

UserAccountView.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string
  }).isRequired
};

export default UserAccountView;
