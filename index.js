require('@babel/register')({
  presets: ['@babel/preset-env', '@babel/preset-react'],
  ignore: ['node_modules']
});

module.exports = require('./src/server/index.js');
