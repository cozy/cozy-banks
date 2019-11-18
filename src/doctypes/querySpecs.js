import CozyClient from 'cozy-client'
import {
  ACCOUNT_DOCTYPE,
  GROUP_DOCTYPE,
  TRIGGER_DOCTYPE,
  TRANSACTION_DOCTYPE,
  APP_DOCTYPE,
  BILLS_DOCTYPE,
  SETTINGS_DOCTYPE,
  RECIPIENT_DOCTYPE
} from './schema'

const older30s = CozyClient.fetchPolicies.olderThan(30 * 1000)

export const accountsConn = {
  query: client => client.all(ACCOUNT_DOCTYPE),
  as: 'accounts',
  fetchPolicy: older30s
}

export const groupsConn = {
  query: client => client.all(GROUP_DOCTYPE),
  as: 'groups',
  fetchPolicy: older30s
}

export const triggersConn = {
  query: client => client.all(TRIGGER_DOCTYPE),
  as: 'triggers'
}

export const transactionsConn = {
  query: client =>
    client
      .all(TRANSACTION_DOCTYPE)
      .UNSAFE_noLimit()
      .include(['bills', 'account', 'reimbursements']),
  as: 'transactions',
  fetchPolicy: older30s
}

export const appsConn = {
  query: client => client.all(APP_DOCTYPE),
  as: 'apps'
}

export const billsConn = {
  query: client => client.all(BILLS_DOCTYPE),
  as: 'bills',
  fetchPolicy: older30s
}

export const settingsConn = {
  query: client => client.all(SETTINGS_DOCTYPE),
  as: 'settings',
  fetchPolicy: older30s
}

export const recipientsConn = {
  query: client => client.all(RECIPIENT_DOCTYPE),
  as: 'recipients',
  fetchPolicy: older30s
}
