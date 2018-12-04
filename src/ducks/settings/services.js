import logger from 'cozy-logger'
import { getDefaultedSettings } from './helpers'
import { Document } from 'cozy-doctypes'
import { DOCTYPE } from './constants'

const log = logger.namespace('settings-doctype')

class Settings extends Document {
  static async fetchWithDefault() {
    const settingDocuments = await this.fetchAll()
    const settings = settingDocuments[0]

    if (!settings) {
      log('info', 'No settings yet, default settings are used')
    }

    return getDefaultedSettings(settings)
  }
}

Settings.doctype = DOCTYPE
Settings.idAttributes = ['_id']

export { Settings }
