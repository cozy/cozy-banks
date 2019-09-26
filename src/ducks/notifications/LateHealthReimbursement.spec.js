import LateHealthReimbursement from './LateHealthReimbursement'
import { Transaction, Bill, BankAccount } from 'src/models'
import { Document } from 'cozy-doctypes'

beforeEach(() => {
  jest.spyOn(Document, 'queryAll').mockResolvedValue([])
  jest.spyOn(Document, 'getAll').mockResolvedValue([])
})

describe('LateHealthReimbursement', () => {
  const setup = ({ lang }) => {
    const localeStrings = require(`../../locales/${lang}.json`)
    const { initTranslation } = require('cozy-ui/react/I18n/translation')
    const translation = initTranslation(lang, () => localeStrings)
    const t = translation.t.bind(translation)
    const notification = new LateHealthReimbursement({
      t,
      data: {},
      lang: 'en',
      locales: {
        en: localeStrings
      },
      client: { stackClient: { uri: 'http://cozy.tools:8080' } },
      value: 20
    })
    return { notification }
  }

  ;['fr', 'en'].forEach(lang => {
    it(`should return push content for lang ${lang}`, () => {
      const { notification } = setup({ lang })
      const oneTransaction = new Array(1)
      const twoTransactions = new Array(2)

      expect(
        notification.getPushContent({ transactions: oneTransaction })
      ).toMatchSnapshot()
      expect(
        notification.getPushContent({ transactions: twoTransactions })
      ).toMatchSnapshot()
    })
  })

  it('should fetch data', async () => {
    jest.spyOn(Transaction, 'queryAll').mockResolvedValue([
      {
        amount: 20,
        date: '2018-09-16T12:00',
        label: '1',
        account: 'accountId1'
      },
      {
        amount: 10,
        date: '2018-09-17T12:00',
        label: '2',
        account: 'accountId2'
      },
      {
        amount: -5,
        date: '2018-09-18T12:00',
        label: '3',
        manualCategoryId: '400610',
        account: 'accountId3',
        reimbursements: [{ billId: 'io.cozy.bills:billId12345' }]
      }
    ])
    jest.spyOn(Document, 'getAll').mockImplementation(async function() {
      if (this.doctype == 'io.cozy.bills') {
        return [{ _id: 'billId12345' }]
      } else if (this.doctype == 'io.cozy.bank.accounts') {
        return [{ _id: 'accountId3' }]
      }
    })
    const { notification } = setup({ lang: 'en' })

    const res = await notification.fetchData()
    expect(Bill.getAll).toHaveBeenCalledWith(['billId12345'])
    expect(BankAccount.getAll).toHaveBeenCalledWith(['accountId3'])
    expect(res.transactions).toHaveLength(1)
    expect(res.accounts).toHaveLength(1)
  })
})
