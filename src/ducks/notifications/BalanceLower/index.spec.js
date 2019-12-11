import CozyClient from 'cozy-client'
import BalanceLower from './index'
import fixtures from 'test/fixtures/unit-tests.json'
import MockDate from 'mockdate'
import { ACCOUNT_DOCTYPE, GROUP_DOCTYPE } from 'doctypes'
import maxBy from 'lodash/maxBy'
import minBy from 'lodash/minBy'

const unique = arr => Array.from(new Set(arr))

const minValueBy = (arr, fn) => fn(minBy(arr, fn))
const maxValueBy = (arr, fn) => fn(maxBy(arr, fn))
const getIDFromAccount = account => account._id
const getAccountBalance = account => account.balance

describe('balance lower', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(msg => {
      throw new Error(`Warning during tests ${msg}`)
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  const setup = ({ value, accountOrGroup } = {}) => {
    const cozyUrl = 'http://cozy.tools:8080'
    const client = new CozyClient({
      uri: cozyUrl
    })
    const locales = {}

    const operations = fixtures['io.cozy.bank.operations']
    const maxDate = operations.map(x => x.date).sort()[0]
    MockDate.set(maxDate)

    const config = {
      rules: [
        {
          value: value || 5000,
          accountOrGroup: accountOrGroup || null
        }
      ],
      data: {
        accounts: fixtures['io.cozy.bank.accounts'],
        groups: fixtures['io.cozy.bank.groups']
      },
      client,
      locales,
      cozyUrl
    }
    const notification = new BalanceLower(config)
    return { config, client, notification }
  }

  it('should keep rules in its internal state', () => {
    const { notification, config } = setup()
    expect(notification.rules).toBe(config.rules)
  })

  describe('without accountOrGroup', () => {
    it('should compute relevant accounts', async () => {
      const { notification } = setup({ value: 5000 })
      const { accounts } = await notification.buildData()
      expect(accounts).toHaveLength(4)
      expect(maxValueBy(accounts, getAccountBalance)).toBeLessThan(5000)
    })

    it('should compute relevant accounts for a different value', async () => {
      const { notification } = setup({ value: 3000 })
      const { accounts } = await notification.buildData()
      expect(accounts).toHaveLength(2)
      expect(maxValueBy(accounts, getAccountBalance)).toBeLessThan(3000)
      expect(unique(accounts.map(getIDFromAccount))).toEqual([
        'compteisa4',
        'comptelou1'
      ])
    })
  })

  describe('with account', () => {
    const compteisa1 = {
      _id: 'compteisa1',
      _type: ACCOUNT_DOCTYPE
    }

    it('should compute relevant accounts', async () => {
      const { notification } = setup({
        accountOrGroup: compteisa1
      })
      const { accounts } = await notification.buildData()
      expect(accounts).toHaveLength(1)
      expect(unique(accounts.map(getIDFromAccount))).toEqual(['compteisa1'])
    })

    it('should compute relevant accounts for a different value', async () => {
      const { notification } = setup({
        value: 3000,
        accountOrGroup: compteisa1
      })
      const data = await notification.buildData()
      expect(data).toBeUndefined()
    })
  })

  describe('with group', () => {
    const isabelleGroup = {
      _id: 'b3e33d6cc334ed5ef49738a2be2880a2',
      _type: GROUP_DOCTYPE
    }

    it('should compute relevant accounts', async () => {
      const { notification } = setup({
        accountOrGroup: isabelleGroup,
        value: 5000
      })
      const { accounts } = await notification.buildData()
      expect(accounts).toHaveLength(2)
      expect(unique(accounts.map(getIDFromAccount))).toEqual([
        'compteisa1',
        'comptelou1'
      ])
      expect(minValueBy(accounts, getAccountBalance)).toBeLessThan(5000)
      expect(maxValueBy(accounts, getAccountBalance)).toBe(3974.25)
    })

    it('should compute relevant accounts for a different value', async () => {
      const { notification } = setup({
        value: 500,
        accountOrGroup: isabelleGroup
      })
      const { accounts } = await notification.buildData()
      expect(accounts).toHaveLength(1)
      expect(unique(accounts.map(getIDFromAccount))).toEqual(['comptelou1'])
      expect(minValueBy(accounts, getAccountBalance)).toBeLessThan(500)
      expect(maxValueBy(accounts, getAccountBalance)).toBe(325.24)
    })
  })
})
