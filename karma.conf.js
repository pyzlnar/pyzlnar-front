const webpack = require('webpack');

const webpackConfig = {
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|jspm_packages)/,
        loader: 'babel-loader',
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

let browser;
switch(process.env.KARMA_BROWSER) {
  case 'phantomjs':
    browser = ['PhantomJS']
    break;
  default:
    browser = ['Chrome']
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
    browsers: browser,
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
