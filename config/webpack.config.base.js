'use strict'

const path = require('path')
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
const PostCSSAssetsPlugin = require('postcss-assets-webpack-plugin')
const sortCSSmq = require('sort-css-media-queries')

const { extractor, production } = require('./webpack.vars')
const SRC_DIR = path.resolve(__dirname, '../src')
const webpack = require('webpack')
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin')
const StringReplacePlugin = require('string-replace-webpack-plugin')

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
          use: [{
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: true,
              sourceMap: true,
              localIdentName: '[name]_[local]_[hash:base64:5]'
            }
          }, {
            loader: 'stylus-loader',
            options: {
              sourceMap: true
            }
          }]
        })
      },
      {
        test: /\.css$/,
        loader: extractor.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: loader => [require('autoprefixer')()]
              }
            }
          ]
        })
      },
      // Fonts
      {
        test: /\.woff2?$/,
        loader: 'file-loader'
      }
    ],
    noParse: [/localforage\/dist/]
  },
  plugins: [
    new StringReplacePlugin(),
    // ChartJS uses moment :( To remove when we do not use it anymore
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|fr/),
    new webpack.ContextReplacementPlugin(/date-fns[\/\\]locale$/, /en|fr/),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'defer'
    }),
    extractor,
    new DuplicatePackageCheckerPlugin({ verbose: true }),
    new PostCSSAssetsPlugin({
      test: /\.css$/,
      plugins: [
        require('autoprefixer')(['last 2 versions']),
        require('css-mqpacker')({sort: sortCSSmq}),
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
  ].concat(process.env.WEBPACK_STATS_FILE
    ? [ new StatsPlugin(process.env.WEBPACK_STATS_FILE, {
        chunkModules: true,
        exclude: [/node_modules[\\\/]react/]
      }) ]
    : [])
}
