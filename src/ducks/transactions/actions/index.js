import { find, filter } from 'lodash'
import KonnectorAction from './KonnectorAction'
import HealthLinkAction from './HealthLinkAction'
import AppLinkAction from './AppLinkAction'
import UrlLinkAction from './UrlLinkAction'
import BillAction from './BillAction'
import AlertAction from './AlertAction'
import CommentAction from './CommentAction'
import AttachAction from './AttachAction'
import HealthExpenseAction from './HealthExpenseAction'
import HealthExpenseStatusAction from './HealthExpenseStatusAction'

const actions = [
  HealthExpenseStatusAction,
  HealthExpenseAction,
  HealthLinkAction,
  KonnectorAction,
  UrlLinkAction,
  BillAction,
  AppLinkAction,
  AttachAction,
  CommentAction,
  AlertAction
]

export const findMatchingActions = async (transaction, actionProps) => {
  const matchingActions = []

  for (const action of actions) {
    const matching = await action.match(transaction, actionProps)
    if (matching) {
      matchingActions.push(action)
    }
  }

  const defaultAction = find(
    matchingActions,
    action => action.defaultAction !== false && action.disabled !== true
  )
  const othersAction = filter(
    matchingActions,
    action => action !== defaultAction
  )

  return {
    default: defaultAction,
    others: othersAction
  }
}

export const getActionFromName = name => {
  return find(actions, action => action.name === name)
}
