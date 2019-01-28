/**
 * Compiles the templates with helpers and partials
 */

const Handlebars = require('handlebars')
const layouts = require('handlebars-layouts')
const { parse, format } = require('date-fns')
const { getCategoryId } = require('ducks/categories/helpers')
const { getParentCategory } = require('ducks/categories/categoriesMap')
const utils = require('../utils')

const capitalizeWord = str => {
  if (str.length > 3) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase()
  } else {
    return str
  }
}

const embeds = {
  'style.css': require('!!raw-loader!./style.css') // eslint-disable-line import/no-webpack-loader-syntax
}

Handlebars.registerHelper({
  colored: amount => {
    return new Handlebars.SafeString(
      `<span class='amount amount--${amount > 0 ? 'pos' : 'neg'}'>
${amount >= 0 ? '+' : '-'}
${Math.abs(amount)} €
</span>
`
    )
  },

  parentCategory: function(transaction) {
    return getParentCategory(getCategoryId(transaction))
  },

  embedFile: filename => {
    return embeds[filename]
  },

  get: (a1, a2, a3) => {
    return a1[a2][a3]
  },

  capitalize: str => {
    return str
      .split(' ')
      .map(capitalizeWord)
      .join(' ')
  },

  formatDate: (date, fmt, ctx) => {
    if (ctx === undefined) {
      ctx = fmt
      fmt = 'DD/MM/YYYY'
    }
    if (date.getDay) {
      return format(date, fmt)
    } else {
      const parsed = parse(date.substr(0, 10), 'YYYY-MM-DD')
      return format(parsed, fmt)
    }
  },

  eachPair: function(context, options) {
    let ret = ''

    for (let i = 0, j = context.length; i < j; i++) {
      ret = ret + options.fn(context[i], { blockParams: context[i] })
    }

    return ret
  },

  positive: function(n) {
    return n > 0
  },

  treatedByFormat: utils.treatedByFormat
})

layouts.register(Handlebars)

const partials = {
  'bank-layout': Handlebars.compile(require('./bank-layout.hbs')),
  'cozy-layout': Handlebars.compile(require('./cozy-layout.hbs')),
  'balance-lower': Handlebars.compile(require('./balance-lower.hbs')),
  'transaction-greater': Handlebars.compile(
    require('./transaction-greater.hbs')
  ),
  'health-bill-linked': Handlebars.compile(require('./health-bill-linked.hbs'))
}

Handlebars.registerPartial(partials)

module.exports = Handlebars.partials
