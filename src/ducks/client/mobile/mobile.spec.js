import { getClient } from './mobile'

describe('get mobile client', () => {
  it('should have plugins correctly instantiated', async () => {
    global.__APP_VERSION__ = '1.5.0'
    const client = await getClient()
    expect(client.plugins.push).not.toBeUndefined()
    expect(client.plugins.sentry).not.toBeUndefined()
  })
})
