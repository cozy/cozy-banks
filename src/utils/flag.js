/* global __DEV__ */

import flag from 'cozy-flags'
import { some } from 'lodash'

if (__DEV__ && flag('switcher') === null) {
  flag('switcher', true)
}

const demoFqdns = [
  'stephaniedurand.cozy.rocks',
  'isabelledurand.cozy.rocks',
  'genevievedurand.cozy.rocks',
  'isabelledurand.mycozy.cloud'
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

// Turn on new balance panels UI
flag('balance-panels', true)

// Turn on new Categories page UI
flag('categories-header-primary', true)

// Turn on history chart on movements page
flag('transaction-history', true)

window.flag = flag
