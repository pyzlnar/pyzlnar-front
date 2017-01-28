const webpack = require('webpack');

// Uglifies the output when building
module.exports = function() {
  return {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        comments: false,
        beautify: false,
        compress: {
          warnings:     false,
          drop_console: false
        }
      })
    ]
  };
}
