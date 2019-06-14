import { getUniversalLinkDomain } from 'cozy-ui/transpiled/react/AppLinker'
import { isAndroidApp } from 'cozy-device-helper'
import { protocol } from 'ducks/mobile/constants'

/**
  The redirect uri is by the stack to redirect the user loged from the app (OAuth Client)
  
  We need to add a custom_scheme and custom_path search params in order to be able to 
  deal with an iOS bug during apple-app-site json file retrieving. (https://openradar.appspot.com/33893852)
  Since the json file is not downloaded, the device and the app don't know they have to 
  handle the universal link so we reached the registry (the server behind the universalink domain)
  This server only does redirection. If we reach it, it redirects the client to the fallback_url which is 
  the web version of the app.

  But as we know that we are on the mobile app if we use this method, we add the custom_scheme to the 
  request. Like that, if we reach the server, it can check if the url has the custom_scheme params and 
  instead of redirecting to the web version of the app, redirect to this attribute
*/
export const getRedirectUri = appSlug => {
  const redirectedPath = 'auth'
  return isAndroidApp()
    ? protocol + redirectedPath
    : getUniversalLinkDomain() +
        '/' +
        appSlug +
        `/${redirectedPath}?custom_scheme=${protocol}&custom_path=${redirectedPath}`
}
