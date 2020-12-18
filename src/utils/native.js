/* global JSBridge */

const sendNativeEvent = event => {
  if (!window.cordova) {
    return { error: new Error('Cannot send native event when not in cordova') }
  }
  try {
    const { platformId } = window.cordova
    if (platformId === 'ios') {
      window.webkit.messageHandlers.batchTrackEvent.postMessage(event)
      return { ok: true }
    } else if (platformId === 'android') {
      JSBridge.batchTrackEvent(event)
      return { ok: true }
    } else {
      return { error: new Error(`Unknown platform ${platformId}`) }
    }
  } catch (e) {
    return { error: e }
  }
}

export { sendNativeEvent }
