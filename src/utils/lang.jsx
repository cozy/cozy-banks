/* global __TARGET__ */

import en from 'locales/en.json'
import fr from 'locales/fr.json'
import Polyglot from 'node-polyglot'
import parseCozyData from 'utils/cozyData'
const locales = { en, fr }

export const getLanguageFromDOM = rootOption => {
  const root = rootOption || document.querySelector('[role=application]')
  const { locale } = parseCozyData(root)
  return __TARGET__ === 'mobile' && navigator && navigator.language
    ? navigator.language.slice(0, 2)
    : locale || 'en'
}

/**
 * Used to translate strings
 *
 * To be used when not in React context, in React
 * context, the t function comes from the context
 */
export const getT = () => {
  const lang = getLanguageFromDOM()
  const polyglot = new Polyglot({
    lang: lang,
    phrases: locales[lang]
  })
  return polyglot.t.bind(polyglot)
}
