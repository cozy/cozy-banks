'use strict'

const merge = require('webpack-merge')
const {
  production,
  target,
  hotReload,
  analyze
} = require('./config/webpack.vars')

const common = merge(
  require('./config/webpack.config.base'),
  require('./config/webpack.config.disable-contexts'),
  require('./config/webpack.config.cozy-ui'),
  require('./config/webpack.config.pictures'),
  require('./config/webpack.config.vendors'),
  require('./config/webpack.config.manifest'),
  require('./config/webpack.config.piwik'),
  require('./config/webpack.config.string-replace'),
  hotReload ? require(`./config/webpack.config.hot-reload`) : null,
  analyze ? require(`./config/webpack.config.analyze`) : null,
  require(`./config/webpack.target.${target}`)
)

const modeConfig = production
  ? require('./config/webpack.config.prod')
  : require('./config/webpack.config.dev')

module.exports = merge(common, modeConfig)
