import { sendNativeEvent } from './native'

describe('sendNativeEvent', () => {
  const event = { event: 'VIEW_PFM_comptes' }

  it('should work on ios', () => {
    window.cordova = { platformId: 'ios' }
    const postMessage = jest.fn()
    window.webkit = { messageHandlers: { batchTrackEvent: { postMessage } } }
    const res = sendNativeEvent(event)
    expect(res.ok).toBe(true)
    expect(postMessage).toHaveBeenCalledWith(event)
  })

  it('should work on android', () => {
    window.cordova = { platformId: 'android' }
    const batchTrackEvent = jest.fn()
    window.JSBridge = { batchTrackEvent }
    const res = sendNativeEvent(event)
    expect(res.ok).toBe(true)
    expect(batchTrackEvent).toHaveBeenCalledWith(event)
  })

  it('should return an error when not in cordova', () => {
    window.cordova = null
    const res = sendNativeEvent(event)
    expect(res.error.message).toEqual(
      'Cannot send native event when not in cordova'
    )
  })

  it('should return an error on unknown platform', () => {
    window.cordova = { platformId: 'centos' }
    const res = sendNativeEvent(event)
    expect(res.error.message).toEqual('Unknown platform centos')
  })
})
