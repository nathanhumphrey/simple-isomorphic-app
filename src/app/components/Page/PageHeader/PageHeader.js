import React from 'react';
import PropTypes from 'prop-types';
import './PageHeader.css';

const PageHeader = ({ children }) => {
  return <header className="page-header">{children}</header>;
};

PageHeader.propTypes = {
  children: PropTypes.node
};

export default PageHeader;
