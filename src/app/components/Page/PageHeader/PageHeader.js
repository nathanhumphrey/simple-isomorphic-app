import React from 'react';
import PropTypes from 'prop-types';

const PageHeader = ({ children }) => {
  return <header>{children}</header>;
};

PageHeader.propTypes = {
  children: PropTypes.node
};

export default PageHeader;
