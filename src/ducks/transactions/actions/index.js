import { find, forEach } from 'lodash'
import KonnectorAction from './KonnectorAction'
import HealthLinkAction from './HealthLinkAction'

const actions = [
  HealthLinkAction,
  KonnectorAction
]

export const findMatchingAction = (transaction, actionProps) => {
  return find(actions, action => action.match(transaction, actionProps))
}

export const addIcons = icons => {
  forEach(actions, action => { icons[action.name] = action.icon })
}
