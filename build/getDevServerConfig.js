const API_PORT = 3000;

module.exports = function(PORT, localhost) {
  return {
    devServer: {
      port: PORT,
      compress: true,
      historyApiFallback: {
        index: '/html'
      },
      inline: true,
    }
  }
}
