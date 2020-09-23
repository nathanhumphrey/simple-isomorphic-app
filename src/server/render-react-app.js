import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from '../app/App';

const staticContext = {}; // used to store info about the render

export default ctx => {
  const renderComponent = (
    <html>
      <head>
        <title>Isomorphic React App</title>
        <script src="index.js" defer />
        <link rel="stylesheet" href="main.css" />
      </head>
      <body>
        <div id="app">
          <StaticRouter location={ctx.path} context={staticContext}>
            <App />
          </StaticRouter>
        </div>
      </body>
    </html>
  );

  ctx.body = renderToString(renderComponent);
};
