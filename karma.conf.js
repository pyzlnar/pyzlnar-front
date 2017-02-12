const webpack = require('webpack');

const webpackConfig = {
  colors: true,
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|jspm_packages)/,
        loader: 'babel',
      }
    ],
    noParse: [
      /node_modules\/sinon\//,
    ],
  },
  resolve: {
    alias: {
      'sinon': 'sinon/pkg/sinon'
    }
  },
  node: {
    fs: 'empty'
  }
}

module.exports = (config) => {
  config.set({
    basePath: './',
    singleRun: true,
    frameworks: ['mocha', 'chai-sinon'],
    keepAlive: true,
    reporters: ['mocha'],
    colors: true,
    preprocessors: {
      'src/**/*.js':  ['webpack', 'sourcemap'],
      'test/**/*.js': ['webpack', 'sourcemap']
    },
    proxies: {
      '/static/img/': './img/',
      '/src/': './src/',
      '/test/': './test/',
      '/node_modules/': './node_modules/'
    },
    browsers: ['PhantomJS'],
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      'node_modules/sinon-stub-promise/index.js',
      'test/**/*.spec.js'
    ],
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    },
    client: {
      captureConsole: true,
      mocha: {
        bail: true
      }
    }
  })
}
