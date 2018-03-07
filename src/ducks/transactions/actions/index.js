import { find, forEach } from 'lodash'
import KonnectorAction from './KonnectorAction'

const actions = [
  KonnectorAction
]

export const findMatchingAction = (transaction, actionProps) => {
  return find(actions, action => action.match(transaction, actionProps))
}

export const addIcons = icons => {
  forEach(actions, action => { icons[action.name] = action.icon })
}
