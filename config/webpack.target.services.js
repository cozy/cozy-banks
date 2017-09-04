'use strict'

const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    notifications: path.resolve(__dirname, '../src/targets/services/notifications')
  },
  target: 'node',
  devtool: 'cheap-source-map',
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: '[name].js'
  },
  plugins: [
    new webpack.DefinePlugin({
      __TARGET__: JSON.stringify('services')
    })
  ]
}
