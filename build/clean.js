const CleanWebpackPlugin = require('clean-webpack-plugin');

// Cleans up the static folder when building
module.exports = function(){
  return {
    plugins: [
      new CleanWebpackPlugin(['static/'], {
        root: process.cwd('static/')
      })
    ]
  }
}
