'use strict'

const webpack = require('webpack')

module.exports = {
  output: {
    filename: 'app.[hash].min.js'
  },
  devtool: false,
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'), // to compile on production mode (redux)
      __DEVELOPMENT__: false,
      __DEVTOOLS__: false,
      __STACK_ASSETS__: true
    })
  ]
}
