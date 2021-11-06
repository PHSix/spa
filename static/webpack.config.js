const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: path.resolve(__dirname, 'src/js/index.js'),
  output: {
    filename: 'bundle.js',
  },
  mode: 'development',
  plugins: [
    new htmlWebpackPlugin({
      title: 'SPA',
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.html'),
    }),
  ],
};
