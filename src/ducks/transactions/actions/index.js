import { find, forEach } from 'lodash'
import KonnectorAction from './KonnectorAction'
import HealthLinkAction from './HealthLinkAction'
import AppLinkAction from './AppLinkAction'

const actions = [
  HealthLinkAction,
  KonnectorAction,
  AppLinkAction
]

export const findMatchingAction = (transaction, actionProps) => {
  return find(actions, action => action.match(transaction, actionProps))
}

export const addIcons = icons => {
  forEach(actions, action => { icons[action.name] = action.icon })
}
