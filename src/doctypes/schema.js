import { HasManyReimbursements, HasManyBills } from './relationships'
import { HasManyInPlace } from 'cozy-client'

export const RECIPIENT_DOCTYPE = 'io.cozy.bank.recipients'
export const ACCOUNT_DOCTYPE = 'io.cozy.bank.accounts'
export const GROUP_DOCTYPE = 'io.cozy.bank.groups'
export const TRANSACTION_DOCTYPE = 'io.cozy.bank.operations'
export const SETTINGS_DOCTYPE = 'io.cozy.bank.settings'
export const BILLS_DOCTYPE = 'io.cozy.bills'
export const TRIGGER_DOCTYPE = 'io.cozy.triggers'
export const APP_DOCTYPE = 'io.cozy.apps'
export const KONNECTOR_DOCTYPE = 'io.cozy.konnectors'
export const COZY_ACCOUNT_DOCTYPE = 'io.cozy.accounts'
export const PERMISSION_DOCTYPE = 'io.cozy.permissions'
export const BANK_ACCOUNT_STATS_DOCTYPE = 'io.cozy.bank.accounts.stats'

export const schema = {
  transactions: {
    doctype: TRANSACTION_DOCTYPE,
    attributes: {},
    relationships: {
      account: {
        type: 'belongs-to-in-place',
        doctype: ACCOUNT_DOCTYPE
      },
      bills: {
        type: HasManyBills,
        doctype: BILLS_DOCTYPE
      },
      reimbursements: {
        type: HasManyReimbursements,
        doctype: BILLS_DOCTYPE
      }
    }
  },
  bills: {
    doctype: BILLS_DOCTYPE
  },
  settings: {
    doctype: SETTINGS_DOCTYPE,
    attributes: {},
    relationships: {},
    conflicts: {
      type: 'object',
      attributes: {
        categoryBudgetAlerts: {
          type: 'array',
          idAttribute: 'id',
          attributes: {
            maxThreshold: {
              conflictResolution: 'user'
            },
            categoryId: {
              conflictResolution: 'user'
            },
            accountOrGroup: {
              conflictResolution: 'user'
            }
          }
        }
      }
    }
  },
  bankAccounts: {
    doctype: ACCOUNT_DOCTYPE,
    attributes: {},
    relationships: {
      checkingsAccount: {
        type: 'has-one',
        doctype: ACCOUNT_DOCTYPE
      }
    }
  },
  groups: {
    doctype: GROUP_DOCTYPE,
    attributes: {},
    relationships: {
      accounts: {
        type: HasManyInPlace,
        doctype: ACCOUNT_DOCTYPE
      }
    }
  },
  triggers: {
    doctype: TRIGGER_DOCTYPE,
    attributes: {},
    relationships: {}
  },
  apps: {
    doctype: APP_DOCTYPE,
    attributes: {},
    relationships: {}
  },
  konnectors: {
    doctype: KONNECTOR_DOCTYPE,
    attributes: {},
    relationships: {}
  },
  stats: {
    doctype: BANK_ACCOUNT_STATS_DOCTYPE,
    attributes: {},
    relationships: {
      account: {
        type: 'has-one',
        doctype: ACCOUNT_DOCTYPE
      }
    }
  }
}
