export const RECIPIENT_DOCTYPE = 'io.cozy.mocks.recipients'
export const ACCOUNT_DOCTYPE = 'io.cozy.bank.accounts'
export const GROUP_DOCTYPE = 'io.cozy.bank.groups'
export const TRANSACTION_DOCTYPE = 'io.cozy.bank.operations'
export const BILLS_DOCTYPE = 'io.cozy.bills'
export const TRIGGER_DOCTYPE = 'io.cozy.triggers'
export const BANK_SETTINGS_DOCTYPE = 'io.cozy.bank.settings'

export const schema = {
  transactions: {
    doctype: TRANSACTION_DOCTYPE,
    attributes: {},
    relationships: {}
  },
  settings: {
    doctype: BANK_SETTINGS_DOCTYPE,
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
    relationships: {}
  }
}
