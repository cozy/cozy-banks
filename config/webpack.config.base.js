'use strict'

const path = require('path')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const PostCSSAssetsPlugin = require('postcss-assets-webpack-plugin')

const { extractor, production } = require('./webpack.vars')
const SRC_DIR = path.resolve(__dirname, '../src')
const webpack = require('webpack')

module.exports = {
  output: {
    filename: 'app.js'
  },
  resolve: {
    extensions: ['.js', '.json', '.css', '.jsx'],
    modules: ['node_modules', SRC_DIR]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: SRC_DIR,
        loader: 'eslint-loader',
        enforce: 'pre',
        options: {
          emitWarning: true
        }
      },
      {
        test: /\.jsx?$/,
        include: [SRC_DIR, path.dirname(require.resolve('cozy-client'))],
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      },
      {
        include: SRC_DIR,
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
        test: /\.css$/,
        loader: extractor.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?importLoaders=1',
            {
              loader: 'postcss-loader',
              options: {
                plugins: loader => [require('autoprefixer')()]
              }
            }
          ]
        })
      }
    ],
    noParse: [/localforage\/dist/]
  },
  plugins: [
    // ChartJS uses moment :( To remove when we do not use it anymore
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|fr/),
    new webpack.ContextReplacementPlugin(/date-fns[\/\\]locale$/, /en|fr/),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    }),
    extractor,
    new PostCSSAssetsPlugin({
      test: /\.css$/,
      plugins: [
        require('autoprefixer')(['last 2 versions']),
        require('css-mqpacker'),
        require('postcss-discard-duplicates'),
        require('postcss-discard-empty')
      ].concat(
        production
          ? require('csswring')({
              preservehacks: true,
              removeallcomments: true
            })
          : []
      )
    })
  ]
}
