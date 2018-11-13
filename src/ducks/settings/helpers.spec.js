const { fetchSettings } = require('./helpers')

fdescribe('defaulted settings', () => {
  it('should return defaulted settings', async () => {
    const fakeClient = {
      find: () => {},
      query: () => {
        return Promise.resolve({
          data: [
            {
              notifications: {
                balanceLower: {
                  value: 600,
                  enabled: false
                }
              }
            }
          ]
        })
      }
    }
    const settings = await fetchSettings(fakeClient)
    expect(settings).toMatchSnapshot()
  })
})
