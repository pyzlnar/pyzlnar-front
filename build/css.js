const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

// Helps load the CSS correctly, extract it into a separate file when building
module.exports = function(isBuild) {
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

  const buildCss = {
    plugins: [
      new ExtractTextPlugin(`css/[name].[chunkhash].css`)
    ],
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

  return merge(baseCss, isBuild ? buildCss : devCss)
}
