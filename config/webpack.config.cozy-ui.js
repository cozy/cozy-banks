'use strict'

const { extractor } = require('./webpack.vars')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const path = require('path')

module.exports = {
  resolve: {
    extensions: ['.styl']
  },
  module: {
    rules: [
      {
        include: path.dirname(require.resolve('cozy-ui')),
        test: /\.styl$/,
        loader: extractor.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?importLoaders=2&modules&localIdentName=[name]_[local]_[hash:base64:5]',
            'stylus-loader'
          ]
        })
      },
      {
        test: /\.jsx?$/,
        include: path.dirname(require.resolve('cozy-ui')),
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        stylus: {
          use: [ require('cozy-ui/stylus')() ]
        }
      }
    })
  ]
}
