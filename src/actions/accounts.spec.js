import { removeStats, deleteOrphanOperations } from './accounts'
import CozyClient from 'cozy-client'

describe('removeStats', () => {
  const setup = () => {
    const client = new CozyClient({})
    client.query = jest.fn()
    client.destroy = jest.fn()
    const collection = {
      find: jest.fn(),
      destroyAll: jest.fn()
    }
    client.stackClient.collection = () => collection
    return { client, collection }
  }

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should remove the orphan transactions', async () => {
    const { client, collection } = setup()
    const account = { _id: 'account' }
    const orphans = [{ _id: 't1' }, { _id: 't2' }]
    collection.find.mockResolvedValueOnce({ data: orphans })
    await deleteOrphanOperations(client, account)
    expect(collection.destroyAll).toHaveBeenCalledWith(orphans)
  })

  it('should remove the orphan transactions 2', async () => {
    const { client, collection } = setup()
    const account = { _id: 'account' }
    const orphans1 = Array(100)
      .fill(null)
      .map((x, i) => ({ _id: `t${i}` }))
    const orphans2 = Array(5)
      .fill(null)
      .map((x, i) => ({ _id: `t${i}` }))
    collection.find
      .mockResolvedValueOnce({ data: orphans1 })
      .mockResolvedValueOnce({ data: orphans2 })
    await deleteOrphanOperations(client, account)
    expect(collection.destroyAll).toHaveBeenCalledWith(orphans1)
    expect(collection.destroyAll).toHaveBeenCalledWith(orphans2)
  })

  it('should remove the stats doc corresponding to the account if it exists', async () => {
    const { client } = setup()
    const account = { _id: 'account' }
    const stats = { _id: 'stats' }
    client.query.mockResolvedValueOnce({ data: [stats] })

    await removeStats(client, account)

    expect(client.destroy).toHaveBeenCalledWith(stats)
  })

  it('should do nothing if no stats doc corresponding to the account exist', async () => {
    const { client } = setup()
    const account = { _id: 'account' }
    client.query.mockResolvedValueOnce({ data: [] })

    await removeStats(client, account)

    expect(client.destroy).not.toHaveBeenCalled()
  })
})
