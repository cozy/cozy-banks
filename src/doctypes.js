export const RECIPIENT_DOCTYPE = 'io.cozy.mocks.recipients'
export const ACCOUNT_DOCTYPE = 'io.cozy.bank.accounts'
export const GROUP_DOCTYPE = 'io.cozy.bank.groups'
export const TRANSACTION_DOCTYPE = 'io.cozy.bank.operations'
export const SETTINGS_DOCTYPE = 'io.cozy.bank.settings'
export const BILLS_DOCTYPE = 'io.cozy.bills'
export const TRIGGER_DOCTYPE = 'io.cozy.triggers'
export const APP_DOCTYPE = 'io.cozy.apps'

export const offlineDoctypes = [
  ACCOUNT_DOCTYPE,
  GROUP_DOCTYPE,
  TRANSACTION_DOCTYPE,
  SETTINGS_DOCTYPE
]

export const schema = {
  transactions: {
    doctype: TRANSACTION_DOCTYPE,
    attributes: {},
    relationships: {}
  },
  settings: {
    doctype: SETTINGS_DOCTYPE,
    attributes: {},
    relationships: {}
  },
  accounts: {
    doctype: ACCOUNT_DOCTYPE,
    attributes: {},
    relationships: {}
  },
  groups: {
    doctype: GROUP_DOCTYPE,
    attributes: {},
    relationships: {
      accounts: {
        type: 'has-many-UNSAFE',
        doctype: ACCOUNT_DOCTYPE
      }
    }
  }
}
