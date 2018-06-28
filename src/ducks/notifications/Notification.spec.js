import libs from 'cozy-konnector-libs'
import BalanceLower from './BalanceLower'

jest.mock('mjml', () => ({
  mjml2html: x => ({ html: x, errors: [] }) // mjml does not work in jest
}))

describe('balance lower', () => {
  beforeEach(() => {
    libs.cozyClient.fetchJSON = jest.fn().mockReturnValue(Promise.resolve())
  })

  let currentAccounts
  const sendBalanceLower = async () => {
    const balanceLower = new BalanceLower({
      value: 50,
      data: {
        accounts: currentAccounts
      },
      t: x => x
    })
    await balanceLower.sendNotification()
  }

  it('should send balance lower', async () => {
    currentAccounts = [{ balance: 100, label: 'Account with money' }]
    await sendBalanceLower()
    expect(libs.cozyClient.fetchJSON).not.toHaveBeenCalled()
  })

  it('should send balance lower', async () => {
    currentAccounts = [{ balance: 0, label: 'Account with no money' }]
    await sendBalanceLower()
    expect(libs.cozyClient.fetchJSON).toHaveBeenCalled()
    expect(libs.cozyClient.fetchJSON.mock.calls).toMatchSnapshot()
  })
})
