import { cozyClient } from 'cozy-konnector-libs'

class Notification {
  constructor (config) {
    this.t = config.t
  }

  sendNotification () {
    if (!this.notification) { return }
    return cozyClient.fetchJSON('POST', '/notifications', {
      data: {
        type: 'io.cozy.notifications',
        attributes: this.notification
      }
    })
  }
}

export default Notification
