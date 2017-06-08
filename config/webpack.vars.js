'use strict'

const ExtractTextPlugin = require('extract-text-webpack-plugin')

const production = /:production$/.test(process.env.NODE_ENV)
const target = process.env.NODE_ENV.match(/^(\w+):/)[1]
const hotReload = !!process.env.HOT_RELOAD
const skin = process.env.SKIN

module.exports = {
  production: production,
  target: target,
  hotReload,
  extractor: new ExtractTextPlugin(`app${production ? '.[hash].min' : ''}.css`),
  skin

}
