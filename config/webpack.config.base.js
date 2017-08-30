'use strict'

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const PostCSSAssetsPlugin = require('postcss-assets-webpack-plugin')

const {extractor, production} = require('./webpack.vars')
const pkg = require(path.resolve(__dirname, '../package.json'))
const SRC_DIR = path.resolve(__dirname, '../src')
const webpack = require('webpack')

module.exports = {
  output: {
    filename: 'app.js'
  },
  resolve: {
    extensions: ['', '.js', '.json', '.css'],
    modulesDirectories: ['node_modules', SRC_DIR],
    alias: {
      'redux-cozy-client': path.resolve(SRC_DIR, './lib/redux-cozy-client')
    }
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        include: SRC_DIR,
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|cozy-(bar|client-js))/,
        loader: 'babel-loader'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.css$/,
        loader: extractor.extract('style', [
          'css-loader?importLoaders=1',
          'postcss-loader'
        ])
      }
    ],
    noParse: [
      /localforage\/dist/
    ]
  },
  postcss: () => {
    return [
      require('autoprefixer')(['last 2 versions'])
    ]
  },
  standard: {
   parser: 'babel-eslint'
  },
  plugins: [
    // ChartJS uses moment :( To remove when we do not use it anymore
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|fr/),
    new webpack.ContextReplacementPlugin(/date-fns[\/\\]locale$/, /en|fr/),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.ejs'),
      title: pkg.name,
      inject: 'head',
      minify: {
        collapseWhitespace: true
      }
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    }),
    extractor,
    new PostCSSAssetsPlugin({
      test: /\.css$/,
      plugins: [
        require('css-mqpacker'),
        require('postcss-discard-duplicates'),
        require('postcss-discard-empty')
      ].concat(
        production ? require('csswring')({preservehacks: true, removeallcomments: true}) : []
      )
    })
  ]
}
