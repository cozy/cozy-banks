/* global device */

export const onIOS = () =>
  typeof device !== 'undefined' && device.platform === 'iOS'
