const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

// Helps load the CSS correctly, extract it into a separate file when building
module.exports = function(isBuild) {
  const baseCss = {
    plugins: [
      new webpack.LoaderOptionsPlugin({
        options: {
          postcss: [
            autoprefixer({ browsers: ['> 5%'] })
          ]
        }
      })
    ]
  }

  const buildCss = {
    plugins: [
      new ExtractTextPlugin('css/[name].[contenthash].css')
    ],
    module: {
      rules: [
        {
          test: /\.(css|scss)$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader',
              'postcss-loader',
              'sass-loader'
            ]
          })
        }
      ]
    }
  }

  const devCss = {
    module: {
      rules: [
        {
          test: /\.(css|scss)$/,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        }
      ]
    }
  }

  return merge(baseCss, isBuild ? buildCss : devCss)
}
