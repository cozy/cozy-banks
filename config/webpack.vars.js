'use strict'

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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
  skin
}
