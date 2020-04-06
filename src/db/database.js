const path = require('path');

module.exports = {
  development: {
    storage: path.resolve(__dirname, '../../tmp/test.sqlite'),
    dialect: 'sqlite'
  }
};
