const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = function(isProd) {
  const baseCss = {
    postcss: (webpack) => {
      return {
        plugins: [
          autoprefixer({
            browsers: ['> 5%']
          })
        ]
      }
    }
  }

  const prodCss = {
    module: {
      loaders: [
        {
          test: /\.(css|scss)$/,
          loader: ExtractTextPlugin.extract('style-loader', '!css-loader!postcss-loader!sass-loader')
        }
      ]
    }
  }

  const devCss = {
    module: {
      loaders: [
        {
          test: /\.(css|scss)$/,
          loaders: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
        }
      ]
    }
  }

  return merge(baseCss, isProd ? prodCss : devCss)
}
