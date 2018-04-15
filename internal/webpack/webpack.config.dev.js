const path = require('path');

module.exports = require('./webpack.config.base')({
  entry: [
    path.join(process.cwd(), 'src/main.ts'),
  ],

  plugins: [],
});
