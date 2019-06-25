export const DOCTYPE = 'io.cozy.bank.settings'
export const COLLECTION_NAME = 'settings'

export const DEFAULTS_SETTINGS = {
  _type: 'io.cozy.bank.settings',
  notifications: {
    lastSeq: 0,
    balanceLower: {
      value: 100,
      enabled: false
    },
    transactionGreater: {
      value: 600,
      enabled: true
    },
    healthBillLinked: {
      enabled: true
    },
    lateHealthReimbursement: {
      value: 30,
      enabled: false
    },
    delayedDebit: {
      enabled: false,
      accountsAssociations: []
    },
    salaire: {
      enabled: false
    },
    hebdo: {
      enabled: false
    },
    mensuel: {
      enabled: false
    }
  },
  billsMatching: {
    billsLastSeq: '0',
    transactionsLastSeq: '0'
  },
  appSuggestions: {
    lastSeq: 0
  },
  community: {
    localModelOverride: {
      enabled: true
    }
  },
  categorization: {
    lastSeq: 0
  },
  showIncomeCategory: true
}
