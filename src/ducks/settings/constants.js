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
  community: {
    autoCategorization: {
      enabled: false
    },
    localModelOverride: {
      enabled: false
    }
  },
  categorization: {
    lastSeq: 0
  },
  showIncomeCategory: true,
  balanceHistory: {
    enabled: false
  }
}
