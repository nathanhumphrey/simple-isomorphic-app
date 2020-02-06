import React from 'react';

const Page = ({ children }) => {
  return (
    <div className="page-container">
      <main>{children}</main>
    </div>
  );
};

export default Page;
