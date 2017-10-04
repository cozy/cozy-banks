const { I18n } = require('cozy-ui/react/I18n')
const tr = require('locales/fr.json')
const React = require('react')

export default ({ children }) =>
  <I18n lang='en' dictRequire={lang => tr}>
    { children }
  </I18n>
