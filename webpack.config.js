'use strict'

const { ProvidePlugin } = require('webpack')
const merge = require('webpack-merge')
const { mergeAppConfigs } = require('cozy-scripts/utils/merge')
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
const {
  production,
  target,
  hotReload,
  analyze
} = require('./config/webpack.vars')

const provided = {}

if (target !== 'mobile') {
  provided['cozy.bar'] = 'cozy-bar/dist/cozy-bar.js'
}


const common = mergeAppConfigs([
  require('cozy-scripts/config/webpack.config.eslint'),
  require('./config/webpack.config.base'),
  require('cozy-scripts/config/webpack.config.cozy-ui'),
  require('cozy-scripts/config/webpack.config.cozy-ui.react'),
  {
    resolve: {
      alias: {
      'cozy-ui/react': 'cozy-ui/transpiled/react'
      }
    }
  },
  {
    plugins: [new ProvidePlugin(provided)],
    module: {
      rules: [
        {
          test: /cozy-bar\/dist\/cozy-bar\.js$/,
          loader: 'imports-loader?css=./cozy-bar.css'
        }
      ]
    }
  },
  require('cozy-scripts/config/webpack.config.css-modules'),
  require('cozy-scripts/config/webpack.config.pictures'),
  require('./config/webpack.config.disable-contexts'),
  require('./config/webpack.config.versions'),
  require('./config/webpack.config.manifest'),
  require('./config/webpack.config.piwik'),
  require('./config/webpack.config.vendors'),
  hotReload ? require(`./config/webpack.config.hot-reload`) : null,
  analyze ? require('cozy-scripts/config/webpack.config.analyzer') : null
].filter(Boolean))

const targetCfg = require(`./config/webpack.target.${target}`)

const withTarget = merge.strategy({
  'resolve.extensions': 'prepend'
})(common, targetCfg)

const modeConfig = production
  ? require('./config/webpack.config.prod')
  : require('cozy-scripts/config/webpack.environment.dev')

const smp = new SpeedMeasurePlugin()
const config = merge(modeConfig, withTarget)

module.exports = process.env.SMP ? smp.wrap(config) : config

if (require.main === module) {
  // eslint-disable-next-line no-console
  console.log(module.exports)
}
