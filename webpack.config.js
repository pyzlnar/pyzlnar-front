const path     = require('path');
const webpack  = require('webpack');
const merge    = require('webpack-merge');
const validate = require('webpack-validator');

// ENV variables
const localhost = 'http://127.0.0.1';
const PORT      = 8080;
const TARGET    = process.env.npm_lifecycle_event;

// Env configs
const getCommon = require('./build/getWebpackCommon');
const getDevServerConfig = require('./build/getDevServerConfig');

// Helpers
const clean  = require('./build/clean');
const copy   = require('./build/copy');
const css    = require('./build/css');
const uglify = require('./build/uglify');

var config;
switch(TARGET) {
  case 'build':
    config = validate(getProdConfig());
    break;
  case 'dev:build':
    config = validate(getDevBuild());
    break;
  default:
    config = validate(getDevConfig());
}
module.exports = config;

// Config by ENV

function getProdConfig() {
  return merge(getCommon(), {
    entry: [
      'babel-polyfill',
      path.join(__dirname, 'src', 'index.js')
    ],
    output: {
      path: 'static',
      publicPath: 'static/'
    },
    devtool: 'cheap-module-source-map',
    resolve: {
      alias: {
        'react': path.resolve(__dirname, 'node_modules', 'react', 'dist', 'react.js'),
        'react-dom': path.resolve(__dirname, 'node_modules', 'react-dom', 'dist', 'react-dom.js')
      }
    },
    plugins: [
      new webpack.optimize.DedupePlugin()
    ]
  },
  css(isBuild = true),
  uglify(),
  copy(),
  clean()
  );
}

function getDevBuild() {
}

function getDevConfig() {
  return merge(getCommon(), {
    entry: [
      `webpack-dev-server/client?${localhost}:${PORT}`,
      'webpack/hot/only-dev-server',
      'babel-polyfill',
      path.join(__dirname, 'src', 'index.js')
    ],
    watch: true,
    devtool: 'eval',
    output: {
      path: '/',
      publicPath: '/'
    },
    devServer: {
      hot: true
    },
  },
  css(isBuild = false),
  getDevServerConfig(localhost, PORT)
  );
}

