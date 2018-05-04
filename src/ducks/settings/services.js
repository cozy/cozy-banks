import { cozyClient, log } from 'cozy-konnector-libs'
import { DEFAULTS_SETTINGS, DOCTYPE } from './constants'
import merge from 'lodash/merge'

const createSetting = setting => {
  log('info', 'Create setting')

  cozyClient.data.create(DOCTYPE, setting)
}

export const readSetting = async () => {
  log('info', 'Read setting')
  const settings = await cozyClient.data.findAll(DOCTYPE)

  if (settings.length > 0) {
    return merge({}, DEFAULTS_SETTINGS, settings[0])
  }

  return DEFAULTS_SETTINGS
}

const updateSetting = setting => {
  log('info', 'Update setting')

  return cozyClient.data.update(DOCTYPE, setting, setting)
}

export const saveSetting = setting => {
  const updateOrCreate = setting._id ? updateSetting : createSetting

  return updateOrCreate(setting)
}
