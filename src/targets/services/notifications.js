import { cozyClient } from 'cozy-konnector-libs'

const getConfiguration = async () => {
  const configurations = await cozyClient.data.findAll('io.cozy.bank.settings')
  if (configurations.length > 0 && configurations[0].notifications) {
    return configurations[0].notifications
  } else {
    return undefined
  }
}

const notificationsService = async () => {
  const config = await getConfiguration()
  if (config === undefined) return // stop notifications service

  console.log(config)
}

notificationsService()
