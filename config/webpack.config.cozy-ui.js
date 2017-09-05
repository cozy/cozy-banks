'use strict'

const { extractor } = require('./webpack.vars')

module.exports = {
  resolve: {
    extensions: ['.styl']
  },
  module: {
    loaders: [
      {
        test: /\.styl$/,
        loader: extractor.extract('style', [
          'css-loader?importLoaders=2&modules&localIdentName=[name]_[local]_[hash:base64:5]',
          'postcss-loader',
          'stylus-loader'
        ])
      }
    ]
  },
  stylus: {
    use: [ require('cozy-ui/stylus')() ]
  }
}
