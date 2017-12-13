/* global startApp, cordova */

export const DRIVE_INFO = {
  appId: 'io.cozy.drive.mobile',
  uri: 'cozydrive://'
}

export const BANK_INFO = {
  appId: 'io.cozy.bank.mobile2',
  uri: 'cozybank://'
}

const cordovaPluginIsInstalled = () => startApp

// startApp does not take the same params on Android and iOS
const getParams = ({appId, uri}) => {
  if (cordova.platformId === 'android') {
    return {
      'package': appId
    }
  } else {
    return uri
  }
}

export const checkApp = async (appInfo) => {
  const params = getParams(appInfo)
  return new Promise((resolve, reject) => {
    if (cordovaPluginIsInstalled()) {
      startApp.set(params).check(() => resolve(true), () => resolve(false))
    } else {
      console.warn(`Cordova plugin 'com.lampa.startapp' is not installed.`)
      resolve(false)
    }
  })
}

export const launchApp = async (appInfo) => {
  const params = getParams(appInfo)
  return new Promise((resolve, reject) => {
    if (cordovaPluginIsInstalled()) {
      startApp.set(params).start(() => resolve(true), () => resolve(false))
    } else {
      console.warn(`Cordova plugin 'com.lampa.startapp' is not installed.`)
      resolve(false)
    }
  })
}
