'use strict'

const { mergeAppConfigs } = require('cozy-scripts/utils/merge')

module.exports = mergeAppConfigs([
  require('cozy-scripts/config/webpack.config.cozy-ui'),
  require('cozy-scripts/config/webpack.config.cozy-ui.react'),
  require('cozy-scripts/config/webpack.config.css-modules'),
  {
    resolve: {
      alias: {
      'cozy-ui/react': 'cozy-ui/transpiled/react'
      }
    }
  }
])

