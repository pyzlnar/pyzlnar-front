const API_PORT = 3000;

module.exports = function(localhost, PORT) {
  return {
    devServer: {
      port: PORT,
      compress: true,
      historyApiFallback: {
        index: '/html'
      },
      inline: true,
      proxy: {
        '/static/img/*': {
          target: `${localhost}:${PORT}`,
          pathRewrite: {
            '/static/img/': 'images/'
          }
        }
      }
    }
  }
}
