import { cozyClient } from 'cozy-konnector-libs'

class Notification {
  constructor (config) {
    this.t = config.t
    this.data = config.data
  }

  async sendNotification () {
    if (!this.data) { return }

    try {
      const attributes = await Promise.resolve(this.buildNotification(this.data))

      return Promise.all([
        this.sendMail({
          reference: attributes.reference,
          ...attributes.mail
        }),
        this.sendPush(attributes.push)
      ])
    } catch (err) {
      console.log(err)
    }
  }

  sendMail (attributes) {
    return cozyClient.fetchJSON('POST', '/notifications', {
      data: {
        type: 'io.cozy.notifications',
        attributes
      }
    })
  }

  async sendPush (attributes) {
    const [settings] = await cozyClient.data.findAll('io.cozy.bank.settings')
    const devices = settings && settings.push && settings.push.devices

    if (!devices) {
      return
    }

    const promises = Object.keys(devices)
      .map(device => this.sendPushNotificationToDevice(
        devices[device], attributes
      ))

    return Promise.all(promises)
  }

  sendPushNotificationToDevice (deviceToken, attributes) {
    return cozyClient.jobs.create('push', {
      platform: 'android',
      device_token: deviceToken,
      title: attributes.title,
      message: attributes.content
    })
  }
}

export default Notification
