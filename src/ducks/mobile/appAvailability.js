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

const startAppMethod = method => async (appInfo) => {
  const params = getParams(appInfo)
  return new Promise((resolve, reject) => {
    if (cordovaPluginIsInstalled()) {
      startApp.set(params)[method](
        infos => {
          if (infos === 'OK') {
            resolve(true)
          } else {
            // Check return infos example :
            // {
            //   versionName: "0.9.2",
            //   packageName: "io.cozy.drive.mobile",
            //   versionCode: 902,
            //   applicationInfo: "ApplicationInfo{70aa0ef io.cozy.drive.mobile}"
            // }
            resolve(infos)
          }
        },
        error => {
          if (error === false || error.indexOf('NameNotFoundException') === 0) {
            // Plugin returns an error 'NameNotFoundException' on Android and
            // false on iOS when application is not found.
            // We prefer to always return false
            resolve(false)
          } else {
            reject(error)
          }
        }
      )
    } else {
      reject(new Error(`Cordova plugin 'com.lampa.startapp' is not installed.`))
    }
  })
}

export const checkApp = startAppMethod('check')
export const launchApp = startAppMethod('start')
