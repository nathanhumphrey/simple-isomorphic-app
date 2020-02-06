import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../app/App';

export default ctx => {
  const renderComponent = (
    <html>
      <head>
        <title>Isomorphic React App</title>
        <script src="index.js" defer />
      </head>
      <body>
        <div id="app">
          <App />
        </div>
      </body>
    </html>
  );

  ctx.body = renderToString(renderComponent);
};
