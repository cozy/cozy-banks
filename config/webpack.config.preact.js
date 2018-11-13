const webpack = require('webpack')

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env.USE_REACT': 'true',
    })
  ]
}
