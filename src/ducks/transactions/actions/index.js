import { find, forEach } from 'lodash'
import KonnectorAction from './KonnectorAction'
import HealthLinkAction from './HealthLinkAction'
import AppLinkAction from './AppLinkAction'
import UrlLinkAction from './UrlLinkAction'
import BillAction from './BillAction'
import AlertAction from './AlertAction'
import CommentAction from './CommentAction'
import AttachAction from './AttachAction'

const actions = [
  HealthLinkAction,
  KonnectorAction,
  UrlLinkAction,
  BillAction,
  AppLinkAction,
  AlertAction,
  CommentAction,
  AttachAction
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

export const getActionFromName = name => {
  return find(actions, action => action.name === name)
}

export const addIcons = icons => {
  forEach(actions, action => { icons[action.name] = action.icon })
}
