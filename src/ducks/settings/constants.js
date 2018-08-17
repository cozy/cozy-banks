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
      value: 30,
      enabled: false
    },
    healthBillLinked: {
      enabled: false
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
  community: {
    autoCategorization: {
      enabled: false
    }
  },
  categorization: {
    lastSeq: 0
  },
  showIncomeCategory: true
}
