/* global localStorage, __DEVELOPMENT__ */

const prefix = 'flag__'
const getKey = name => prefix + name
const some = require('lodash/some')

const setFlag = (name, value) => {
  return localStorage.setItem(getKey(name), JSON.stringify(value))
}

const getFlag = name => {
  const val = localStorage.getItem(getKey(name))
  if (val) {
    return JSON.parse(val)
  } else {
    // set the key so that it can be listed
    setFlag(name, null)
    return JSON.stringify(null)
  }
}

const flag = function() {
  if (!window.localStorage) {
    return
  }
  const args = [].slice.call(arguments)
  if (args.length === 1) {
    return getFlag(args[0])
  } else {
    return setFlag(args[0], args[1])
  }
}

const rxPrefix = new RegExp('^' + prefix)
export const listFlags = () => {
  return Object.keys(localStorage)
    .filter(x => x.indexOf(prefix) > -1)
    .map(x => x.replace(rxPrefix, ''))
}

export const resetFlags = () => {
  listFlags().forEach(name => localStorage.removeItem(getKey(name)))
}

flag.list = listFlags
flag.reset = resetFlags

if (__DEVELOPMENT__ && flag('switcher') === null) {
  flag('switcher', true)
}

const demoFqdns = [
  'stephaniedurand.cozy.rocks',
  'isabelledurand.cozy.rocks',
  'genevievedurand.cozy.rocks'
]

const locationMatchesFqdn = (location, fqdn) => {
  const splitted = fqdn.split('.')
  const slug = splitted[0]
  const domain = splitted.slice(1).join('.')
  const rx = new RegExp(slug + '.*' + domain.replace('.', '\\.'))
  return rx.exec(location)
}

const isDemoCozy = () => {
  const location = window.location.href
  return some(demoFqdns.map(fqdn => locationMatchesFqdn(location, fqdn)))
}

if (isDemoCozy()) {
  flag('demo', true)
}

window.flag = flag
export default flag
