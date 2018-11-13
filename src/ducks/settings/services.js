import { cozyClient, log } from 'cozy-konnector-libs'
import { DOCTYPE } from './constants'
import { getDefaultedSettings } from './helpers'

const createSetting = setting => {
  log('info', 'Create setting')

  cozyClient.data.create(DOCTYPE, setting)
}

export const readSetting = async () => {
  log('info', 'Read setting')
  const settingDocuments = await cozyClient.data.findAll(DOCTYPE)
  const settings = settingDocuments[0]

  if (!settings) {
    log('info', 'No settings yet, default settings are used')
  }

  return getDefaultedSettings(settings)
}

const updateSetting = setting => {
  log('info', 'Update setting')

  return cozyClient.data.update(DOCTYPE, setting, setting)
}

export const saveSetting = setting => {
  const updateOrCreate = setting._id ? updateSetting : createSetting
  return updateOrCreate(setting)
}
