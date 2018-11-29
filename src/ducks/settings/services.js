import { log } from 'cozy-konnector-libs'
import { getDefaultedSettings } from './helpers'
import { Document } from 'cozy-doctypes'
import { DOCTYPE } from './constants'

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
