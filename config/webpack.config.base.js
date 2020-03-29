'use strict'

const path = require('path')
const { SRC_DIR } = require('./webpack.vars')

module.exports = {
  output: {
    filename: 'app.js'
  },
  resolve: {
    extensions: ['.js', '.json', '.css', '.jsx'],
    modules: ['node_modules', SRC_DIR],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          SRC_DIR,
          path.resolve(__dirname, '../docs'),
          path.dirname(require.resolve('cozy-konnector-libs'))
        ],
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      },
      // Fonts
      {
        test: /\.woff2?$/,
        loader: 'file-loader'
      }
    ],
    noParse: [/localforage\/dist/]
  }
}
