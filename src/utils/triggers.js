const getKonnectorFromTrigger = trigger => {
  if (trigger.message && trigger.message.konnector) {
    return trigger.message.konnector
  } else if (trigger.message.Data) {
    // Legacy triggers
    const message = JSON.parse(atob(trigger.message.Data))
    return message.konnector
  }
}

export { getKonnectorFromTrigger }
