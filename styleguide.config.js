const path = require('path')

module.exports = {
  require: [
    path.resolve(__dirname, 'build/app.css'),
    path.resolve(__dirname, 'styleguide/style.css'),
    path.resolve(__dirname, 'styleguide/setup.js')
  ]
}
