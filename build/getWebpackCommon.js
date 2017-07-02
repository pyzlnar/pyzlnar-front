const path    = require('path');
const merge   = require('webpack-merge');
const webpack = require('webpack');

// HTML config
const getHtmlConfig = require('./getHtmlConfig');

module.exports = function() {
  return merge(getHtmlConfig(), {
    output: {
      filename: "[name].[hash].bundle.js",
    },
    module: {
      rules: [
        {
          test: /\.(png|gif|jpe?g|svg)$/i,
          loader: 'file-loader',
          query: {
            name: '[path][name].[hash].[ext]'
          }
        },

        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          loaders: [
            'babel-loader'
          ]
        },

        {
          test: /\.json$/,
          exclude: /(node_modules)/,
          loader: 'json'
        },

        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url-loader',
          options: {
            limit: 100000,
            mimetype: 'application/font-woff'
          }
        },

        {
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "file-loader"
        }
      ]
    },
    stats: {
      assets:   true,
      versions: false,
      hash:     true,
      timings:  true
    }
  });
}
