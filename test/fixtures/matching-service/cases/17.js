module.exports = {
  description: 'operation from a credit card account',
  bills: [
    {
      _id: 'b1',
      amount: 35,
      groupAmount: 35,
      originalAmount: 70,
      socialSecurityRefund: 35,
      date: '2019-05-09T00:00:00.000Z',
      originalDate: '2019-05-03T00:00:00.000Z',
      isRefund: true,
      vendor: 'lamutuellegenerale',
      type: 'health_costs'
    },
    {
      _id: 'b2',
      amount: 29.9,
      groupAmount: 29.9,
      originalAmount: 70,
      socialSecurityRefund: 16.1,
      date: '2019-06-11T00:00:00.000Z',
      originalDate: '2019-06-04T00:00:00.000Z',
      isRefund: true,
      vendor: 'lamutuellegenerale',
      type: 'health_costs'
    },
    {
      _id: 'b3',
      amount: 35,
      groupAmount: 65.53,
      originalAmount: 70,
      date: '2019-05-07T00:00:00.000Z',
      originalDate: '2019-05-03T00:00:00.000Z',
      isRefund: true,
      vendor: 'Ameli',
      type: 'health_costs'
    },
    {
      _id: 'b4',
      amount: 16.1,
      groupAmount: 11.1,
      originalAmount: 70,
      date: '2019-06-07T00:00:00.000Z',
      originalDate: '2019-06-04T00:00:00.000Z',
      isRefund: true,
      vendor: 'Ameli',
      type: 'health_costs'
    }
  ],
  operations: [
    {
      _id: 'docteur',
      date: '2019-05-31T12:00:00.000Z',
      realisationDate: '2019-05-03T12:00:00.000Z',
      label: 'Docteur Truc',
      amount: -70,
      manualCategoryId: '400610'
    }
  ],
  expectedResult: {
    b1: {
      debitOperation: 'docteur',
      creditOperation: undefined
    },
    b2: {
      debitOperation: undefined,
      creditOperation: undefined
    },
    b3: {
      debitOperation: 'docteur',
      creditOperation: undefined
    },
    b4: {
      debitOperation: undefined,
      creditOperation: undefined
    }
  }
}
