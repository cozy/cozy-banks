'use strict'

const ExtractTextPlugin = require('extract-text-webpack-plugin')

const getTarget = () => {
  try {
    return process.env.NODE_ENV.match(/^(\w+):/)[1]
  } catch (e) {
    return 'browser'
  }
}

const production = /:production$/.test(process.env.NODE_ENV)
const target = getTarget()
const hotReload = !!process.env.HOT_RELOAD
const skin = process.env.SKIN

module.exports = {
  production: production,
  target: target,
  hotReload,
  analyze: process.env.WEBPACK_ANALYZE,
  extractor: new ExtractTextPlugin({
    disable: hotReload ? true : false,
    filename: `app${production ? '.[hash].min' : ''}.css`
  }),
  skin
}
