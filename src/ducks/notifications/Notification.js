import log from 'cozy-logger'
import './url-polyfill'
import { generateUniversalLink } from 'cozy-ui/transpiled/react/AppLinker'
import Handlebars from 'handlebars'
import { helpers, partials as bankPartials } from './html/templates'
import { renderMJML } from './html/utils'
import cozyEmailHandlebars from './html/templates/cozy-email-handlebars'
import mapValues from 'lodash/mapValues'
import {
  isString,
  isObject,
  isFunction,
  isArray,
  validateAgainst
} from './validators'

const partials = {
  ...bankPartials,
  ...cozyEmailHandlebars.partials
}

const classAttributeTypes = {
  template: isString,
  preferredChannels: isArray,
  category: isString
}

const configTypes = {
  t: isFunction,
  data: isObject,
  cozyClient: isObject,
  lang: isString
}

class Notification {
  constructor(config) {
    validateAgainst(config, configTypes)
    this.t = config.t
    this.data = config.data
    this.cozyClient = config.cozyClient
    this.lang = config.lang

    const cozyUrl = this.cozyClient._url

    this.urls = this.constructor.generateURLs(cozyUrl)

    validateAgainst(this.constructor, classAttributeTypes)
  }

  static generateURLs(cozyUrl) {
    const commonOpts = { cozyUrl, slug: 'banks' }
    return {
      banksUrl: generateUniversalLink({ ...commonOpts }),
      balancesUrl: generateUniversalLink({
        ...commonOpts,
        nativePath: '/balances'
      }),
      transactionsUrl: generateUniversalLink({
        ...commonOpts,
        nativePath: '/transactions'
      }),
      settingsUrl: generateUniversalLink({
        ...commonOpts,
        nativePath: '/settings/configuration'
      }),
      healthReimbursementsUrl: generateUniversalLink({
        ...commonOpts,
        nativePath: '/balances/reimbursements'
      })
    }
  }

  /**
   * Implement this method to add additional attributes to the notification
   */
  getNotificationAttributes() {
    return {}
  }

  /**
   * A notification can add helpers and partials in this function
   */
  prepareHandlebars(Handlebars) {
    Handlebars.registerHelper({
      t: this.t
    })
    Handlebars.registerHelper(helpers)
    Handlebars.registerPartial(mapValues(partials, Handlebars.compile))
    cozyEmailHandlebars.register(Handlebars)
  }

  /**
   * A notification can choose not to be sent based on templateData
   */
  shouldSendNotification() {
    return true
  }

  /**
   * Orchestrates the building of the notification
   */
  async buildNotification() {
    const templateData = await this.buildTemplateData()
    templateData.lang = this.lang

    if (!templateData || !this.shouldSendNotification(templateData)) {
      return
    }

    const HandlebarsInstance = Handlebars.create()
    this.prepareHandlebars(HandlebarsInstance)

    const { fullContent } = cozyEmailHandlebars.twoPhaseRender(
      HandlebarsInstance,
      this.constructor.template,
      templateData,
      partials
    )
    const contentHTML = renderMJML(fullContent)

    return {
      category: this.constructor.category,
      title: this.getTitle(templateData),
      message: this.getPushContent(templateData),
      preferred_channels: this.constructor.preferredChannels,
      content: this.constructor.toText(contentHTML),
      content_html: contentHTML,
      ...this.getNotificationAttributes()
    }
  }

  async sendNotification() {
    if (!this.data) {
      log('info', `Notification hasn't data`)
      return
    }

    try {
      const attributes = await Promise.resolve(
        this.buildNotification(this.data)
      )

      if (!attributes) {
        log('info', `Notification hasn't attributes`)
        return
      }

      log('info', `Send notifications with category: ${attributes.category}`)
      const cozyClient = this.cozyClient
      await cozyClient.fetchJSON('POST', '/notifications', {
        data: {
          type: 'io.cozy.notifications',
          attributes
        }
      })

      if (this.onSendNotificationSuccess) {
        this.onSendNotificationSuccess()
      }
    } catch (err) {
      log('info', `Notification error`)
      log('info', err)
      // eslint-disable-next-line no-console
      console.log(err)
    }
  }
}

Notification.template = '' // Children classes will override this
Notification.preferredChannels = ['email', 'mobile'] // Children classes will override this
Notification.category = 'notification' // Children classes will override this
export default Notification
