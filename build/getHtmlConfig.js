const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function() {
  return {
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'html/index.html',
        template: path.join(__dirname, '../src', 'index.hbs')
      })
    ]
  }
}
