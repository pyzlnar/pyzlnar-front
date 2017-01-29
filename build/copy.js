const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// Copys the assets into the appropiate folder when building
module.exports = function() {
  return {
    plugins: [
      new CopyWebpackPlugin([
        { from: 'images', to: 'img' },
      ])
    ]
  }
}
