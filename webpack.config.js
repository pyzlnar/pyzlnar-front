const path = require('path');
const merge    = require('webpack-merge');
const validate = require('webpack-validator');

// ENV variables
const localhost = 'http://127.0.0.1';
const PORT      = 8080
const TARGET    = process.env.npm_lifecycle_event;

// Env configs
const getCommon = require('./build/getWebpackCommon');
const getDevServerConfig = require('./build/getDevServerConfig');

var config;
switch(TARGET) {
  default:
    config = validate(getDevConfig());
}
module.exports = config;

// Config by ENV

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
  getDevServerConfig(PORT)
  );
}

