'use strict'

const { extractor } = require('./webpack.vars')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
module.exports = {
  resolve: {
    extensions: ['.styl']
  },
  module: {
    rules: [
      {
        test: /\.styl$/,
        loader: extractor.extract({
          fallback:'style-loader',
          use: [
            'css-loader?importLoaders=2&modules&localIdentName=[name]_[local]_[hash:base64:5]',
            'stylus-loader'
          ]
        })
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
