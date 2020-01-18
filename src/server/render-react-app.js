import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../app/App';

export default ctx => {
  const renderComponent = (
    <body>
      <div id="app">
        <App />
      </div>
      <script src="index.js" />
    </body>
  );

  ctx.body = renderToString(renderComponent);
};
