'use strict'

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
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
        use: [
         {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader?importLoaders=2&modules&localIdentName=[name]_[local]_[hash:base64:5]',
          'stylus-loader'
        ]
      },
      {
        test: /\.jsx?$/,
        include: path.dirname(require.resolve('cozy-ui')),
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.USE_REACT': 'true',
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        stylus: {
          use: [require('cozy-ui/stylus')()],
          import: ['settings/palette.styl']
        }
      }
    })
  ]
}
