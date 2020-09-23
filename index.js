require('@babel/register')({
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: true
        }
      }
    ],
    '@babel/preset-react'
  ],
  ignore: ['node_modules']
});

module.exports = require('./src/server/index.js');
