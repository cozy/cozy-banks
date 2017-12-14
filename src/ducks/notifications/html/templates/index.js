const Handlebars = require('handlebars')
const layouts = require('handlebars-layouts')
const _ = require('lodash')
const fs = require('fs')
const path = require('path')
const glob = require('glob').sync
const { parse, format } = require('date-fns')

const read = name  => {
  return fs.readFileSync(path.join(__dirname, name), 'utf-8')
}

const capitalizeWord = str => {
  if (str.length > 3) {
    return str[0].toUpperCase() + str.slice(1).toLowerCase()
  } else {
    return str
  }
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
    return read(filename)
  },
  get: (a1, a2, a3)  => {
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

const mapToObject = _.flow(_.map, _.fromPairs)
const partials = mapToObject(
  glob('./*.hbs', { cwd: __dirname }),
  x => [
    path.basename(x).replace(/\.hbs$/, ''),
    Handlebars.compile(read(x))
  ])
Handlebars.registerPartial(partials)

module.exports = Handlebars.partials
