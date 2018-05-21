import { getDeviceName } from 'ducks/authentication/lib/client'

const getUpdatedUserAgent = navigator => {
  const deviceName = getDeviceName() || 'unknown device name'
  const identifier = getIdentifier(navigator) || 'unknown identifier'
  const version = getVersion(navigator) || 'unknown version'
  const userAgent = getUserAgent(navigator) || 'unkown user-agent'

  return `${deviceName} ${identifier}-${version} ${userAgent}`
}

const getIdentifier = navigator =>
  navigator && navigator.appInfo && navigator.appInfo.identifier

const getVersion = navigator =>
  navigator && navigator.appInfo && navigator.appInfo.version

const getUserAgent = navigator => navigator && navigator.userAgent

export const updateUserAgent = () => {
  try {
    // Check if the userAgent is not already updated to avoid
    // recursively update it
    const currentUserAgent = window.navigator.userAgent
    const needUpdate = !currentUserAgent.startsWith(getDeviceName())
    if (needUpdate) {
      window.UserAgent.set(getUpdatedUserAgent(window.navigator))
    }
  } catch (err) {
    /* eslint-disable-next-line no-console */
    console.error(
      `Unable to update User-Agent with cordova plugin: ${err.message}`
    )
    throw err
  }
}
