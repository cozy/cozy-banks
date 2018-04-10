import { cozyClient } from 'cozy-konnector-libs'

class Notification {
  constructor(config) {
    this.t = config.t
    this.data = config.data
  }

  async sendNotification() {
    if (!this.data) {
      return
    }

    try {
      const attributes = await Promise.resolve(
        this.buildNotification(this.data)
      )

      return cozyClient.fetchJSON('POST', '/notifications', {
        data: {
          type: 'io.cozy.notifications',
          attributes
        }
      })
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err)
    }
  }
}

export default Notification
