const path = require('path');

module.exports = {
  mode: 'production',
  entry: './js/index.js',
  devtool: 'source-map',
  output: {
    filename: 'content.js',
    path: path.resolve(__dirname, 'js'),
  },
};