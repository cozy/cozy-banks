const { logInfo } = require('lib/sentry')

const getKonnectorFromTrigger = trigger => {
  if (trigger.message && trigger.message.konnector) {
    return trigger.message.konnector
  } else if (trigger.message.Data) {
    // Legacy triggers
    logInfo('Legacy trigger detected')
    const message = JSON.parse(atob(trigger.message.Data))
    return message.konnector
  }
}

export { getKonnectorFromTrigger }
