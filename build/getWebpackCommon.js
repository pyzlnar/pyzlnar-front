const path    = require('path');
const merge   = require('webpack-merge');
const webpack = require('webpack');

// HTML config
const getHtmlConfig = require('./getHtmlConfig');

module.exports = function() {
  return merge(getHtmlConfig(), {
    progress: true,
    output: {
      filename: "[name].[hash].bundle.js",
    },
    module: {
      loaders: [
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
            'babel'
          ]
        },

        {
          test: /\.json$/,
          exclude: /(node_modules)/,
          loader: 'json'
        },

        {
          test: /\.(handlebars|hbs)$/,
          exclude: /(node_modules)/,
          loader: 'handlebars-loader',
          query: { helperDirs: path.resolve(__dirname, 'handlebars') }
        }
      ]
    },
    resolve: {
      alias: {
        // https://github.com/wycats/handlebars.js/issues/953
        'handlebars': 'handlebars/runtime.js'
      }
    },
    stats: {
      assets:   true,
      versions: false,
      hash:     true,
      timings:  true
    }
  });
}
