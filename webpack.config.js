const path     = require('path');
const webpack  = require('webpack');
const merge    = require('webpack-merge');

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
    config = getBuildConfig();
    break;
  case 'dev:build':
    config = getDevBuildConfig();
    break;
  default:
    config = getDevConfig();
}
module.exports = config;

// Config by ENV

// Builds the app, production ready
function getBuildConfig() {
  return merge(getCommon(), {
    entry: [
      'babel-polyfill',
      path.join(__dirname, 'src', 'index.js')
    ],
    output: {
      path: path.resolve(__dirname, 'static'),
      publicPath: '/static/'
    },
    devtool: 'cheap-module-source-map',
    resolve: {
      alias: {
        'react': path.resolve(__dirname, 'node_modules', 'react', 'dist', 'react.js'),
        'react-dom': path.resolve(__dirname, 'node_modules', 'react-dom', 'dist', 'react-dom.js')
      }
    },
  },
  css(isBuild = true),
  uglify(),
  copy(),
  clean()
  );
}

// Builds the app, serves it locally
function getDevBuildConfig() {
  return merge(getCommon(), {
    entry: [
      'babel-polyfill',
      path.join(__dirname, 'src', 'index.js')
    ],
    output: {
      path: 'static',
      publicPath: '/'
    }
  },
  getDevServerConfig(localhost, PORT),
  css(isBuild = true),
  uglify()
  );
}

// Serves the app locally, hot serves so changes are applied automatically
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
  getDevServerConfig(localhost, PORT),
  css(isBuild = false)
  );
}

