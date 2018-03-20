import { forEach } from 'lodash'
import KonnectorAction from './KonnectorAction'
import HealthLinkAction from './HealthLinkAction'
import AppLinkAction from './AppLinkAction'
import UrlLinkAction from './UrlLinkAction'
import BillAction from './BillAction'

const actions = [
  HealthLinkAction,
  KonnectorAction,
  UrlLinkAction,
  BillAction,
  AppLinkAction
]

export const findMatchingAction = async (transaction, actionProps) => {
  for (const action of actions) {
    const matching = await action.match(transaction, actionProps)
    if (matching) {
      return action
    }
  }
  return false
}

export const addIcons = icons => {
  forEach(actions, action => { icons[action.name] = action.icon })
}
