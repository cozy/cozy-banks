const Handlebars = require('handlebars')
const layouts = require('handlebars-layouts')
const { parse, format } = require('date-fns')

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
${amount > 0 ? '+' : '-'}
${Math.abs(amount)} €
</span>
`
    )
  },
  embedFile: filename => {
    return embeds[filename]
  },
  get: (a1, a2, a3) => {
    return a1[a2][a3]
  },
  capitalize: (str) => {
    return str.split(' ').map(capitalizeWord).join(' ')
  },
  formatDate: date => {
    return format(parse(date, 'YYYY-MM-DD'), 'D MMMM YYYY')
  }
})

layouts.register(Handlebars)

const partials = {
  'bank-layout': Handlebars.compile(require('./bank-layout.hbs')),
  'cozy-layout': Handlebars.compile(require('./cozy-layout.hbs')),
  'balance-lower': Handlebars.compile(require('./balance-lower.hbs')),
  'transaction-greater': Handlebars.compile(require('./transaction-greater.hbs'))
}

Handlebars.registerPartial(partials)

module.exports = Handlebars.partials
