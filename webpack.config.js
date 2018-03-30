'use strict'

const path = require('path')
const merge = require('webpack-merge')
const { production, target, hotReload } = require('./config/webpack.vars')

const common = merge(
  require('./config/webpack.config.base'),
  require('./config/webpack.config.disable-contexts'),
  require('./config/webpack.config.preact'),
  require('./config/webpack.config.cozy-ui'),
  require('./config/webpack.config.pictures'),
  require('./config/webpack.config.vendors'),
  require('./config/webpack.config.manifest'),
  require('./config/webpack.config.piwik'),
  require('./config/webpack.config.string-replace'),
  hotReload ? require(`./config/webpack.config.hot-reload`) : null,
  require(`./config/webpack.target.${target}`), {
    resolve: {
      modules: [path.resolve('./node_modules'), path.resolve('../node_modules')]
    }
  }
)

if (production) {
  module.exports = merge(common, require('./config/webpack.config.prod'))
} else {
  module.exports = merge(common, require('./config/webpack.config.dev'))
}
