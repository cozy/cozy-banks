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

const actions = {
  HealthExpenseStatusAction: HealthExpenseStatusAction,
  HealthExpenseAction: HealthExpenseAction,
  HealthLinkAction: HealthLinkAction,
  KonnectorAction: KonnectorAction,
  UrlLinkAction: UrlLinkAction,
  BillAction: BillAction,
  AppLinkAction: AppLinkAction,
  AttachAction: AttachAction,
  CommentAction: CommentAction,
  AlertAction: AlertAction
}

export const findMatchingActions = async (transaction, actionProps) => {
  const matchingActions = []

  for (const [actionName, action] of Object.entries(actions)) {
    try {
      const matching = await action.match(transaction, actionProps)
      if (matching) {
        matchingActions.push(action)
      }
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') {
        console.log('action failed', actionName) // eslint-disable-line no-console
        console.warn(e) // eslint-disable-line no-console
      }
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
