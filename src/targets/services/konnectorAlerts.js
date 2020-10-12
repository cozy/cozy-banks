import mapValues from 'lodash/mapValues'
import keyBy from 'lodash/keyBy'
import uniq from 'lodash/uniq'
import fromPairs from 'lodash/fromPairs'
import get from 'lodash/get'

import { Q, models } from 'cozy-client'
import flag from 'cozy-flags'
import cozyLogger from 'cozy-logger'
import { runService, dictRequire, lang } from './service'
import NotificationView from 'ducks/notifications/BaseNotificationView'
import { getCurrentDate } from 'ducks/notifications/utils'
import template from 'ducks/konnectorAlerts/template.hbs'
import { sendNotification } from 'cozy-notifications'
import { getErrorLocaleBound, KonnectorJobError } from 'cozy-harvest-lib'

const { isKonnectorWorker } = models.trigger.triggers

const logger = cozyLogger.namespace('konnector-alerts')

const TRIGGER_STATES_DOC_TYPE = 'io.cozy.bank.settings'
const TRIGGER_STATES_DOC_ID = 'trigger-states'

/** Fetch triggers states from a special doc in the settings */
const fetchTriggerStates = async client => {
  try {
    const { data } = await client.query(
      Q(TRIGGER_STATES_DOC_TYPE).getById(TRIGGER_STATES_DOC_ID)
    )
    return data
  } catch {
    return {}
  }
}

/** Stores triggers states in a special doc in the settings */
const storeTriggerStates = async (client, triggers, previousDoc) => {
  const triggerStatesById = mapValues(
    keyBy(triggers, '_id'),
    trigger => trigger.current_state
  )
  const doc = {
    _id: TRIGGER_STATES_DOC_ID,
    _type: TRIGGER_STATES_DOC_TYPE,
    _rev: previousDoc ? previousDoc._rev : null,
    triggerStates: triggerStatesById
  }
  return await client.save(doc)
}

const isErrorActionable = errorMessage => {
  return (
    errorMessage.startsWith('LOGIN_FAILED') ||
    errorMessage.startsWith('USER_ACTION_NEEDED')
  )
}

/**
 * Returns whether we need to send a notification for a trigger
 */
const shouldNotify = async (client, trigger, previousStatesByTriggerId) => {
  const previousState = previousStatesByTriggerId[trigger._id]
  if (!previousState) {
    return false
  } else if (
    (previousState.status == 'done' ||
      flag('banks.konnector-alerts.ignore-previous-status')) &&
    trigger.current_state.status === 'errored' &&
    isErrorActionable(trigger.current_state.last_error)
  ) {
    // We do not want to send notifications for jobs that were launched manually
    const jobId = trigger.current_state.last_executed_job_id
    const { data: job } = await client.query(Q('io.cozy.jobs').getById(jobId))
    if (
      job.manual_execution &&
      !flag('banks.konnector-alerts.allow-manual-jobs')
    ) {
      return false
    }
    return true
  }
  return false
}

class KonnectorAlertView extends NotificationView {
  constructor(options) {
    super(options)
    this.currentDate = options.currentDate
    this.konnectorAlerts = options.konnectorAlerts
  }

  shouldSend(templateData) {
    const willSend =
      !!templateData.konnectorAlerts && templateData.konnectorAlerts.length > 0
    if (!willSend) {
      logger('info', 'Nothing to send, bailing out')
    }
    return willSend
  }

  async buildData() {
    const data = {
      date: getCurrentDate(),
      konnectorAlerts: this.konnectorAlerts.map(alert => {
        const { trigger, konnectorName } = alert
        const konnError = new KonnectorJobError(
          trigger.current_state.last_error
        )
        const title = getErrorLocaleBound(
          konnError,
          konnectorName,
          this.lang,
          'title'
        )
        const description = this.t('Transactions.trigger-error.description', {
          bankName: konnectorName
        })
        return {
          ...alert,
          title,
          description
        }
      }),
      ctaText: this.t('Transactions.trigger-error.cta'),
      homeUrl: this.urls.homeUrl
    }

    return data
  }

  getTitle(templateData) {
    const { konnectorAlerts } = templateData
    const hasMultipleAlerts = konnectorAlerts.length > 1
    return hasMultipleAlerts
      ? this.t('Notifications.konnectorAlerts.email.title-multi', {
          alertCount: konnectorAlerts.length
        })
      : this.t('Notifications.konnectorAlerts.email.title-single', {
          konnectorName: konnectorAlerts[0].konnectorName
        })
  }

  getPushContent(templateData) {
    const { konnectorAlerts } = templateData
    return this.t('Notifications.konnectorAlerts.push.content', {
      slugs: konnectorAlerts.map(x => x.konnectorName).join(', ')
    })
  }
}

KonnectorAlertView.template = template
KonnectorAlertView.category = 'konnector-alerts'
KonnectorAlertView.preferredChannels = ['mobile', 'mail']

/**
 * Build the notification view for konnector alerts
 *
 * @param  {CozyClient} client - Cozy client
 * @param  {object} options - Options
 * @param  {Array.<KonnectorAlert>} options.konnectorAlerts - Alerts to include in the notification
 * @return {NotificationView} - The konnector alerts notification view
 */
export const buildNotificationView = (client, options) => {
  const notifView = new KonnectorAlertView({
    client,
    lang,
    data: {},
    locales: {
      [lang]: dictRequire(lang)
    },
    ...options
  })
  return notifView
}

const fetchRegistryInfo = async (client, konnectorSlug) => {
  return client.stackClient.fetchJSON('GET', `/registry/${konnectorSlug}`)
}

/**
 * Fetches triggers, filters those for which we can send a notification, and send
 * notifications.
 *
 * @param  {CozyClient} client - Cozy client
 * @return {Promise}
 */
export const sendTriggerNotifications = async client => {
  const { data: triggers } = await client.query(Q('io.cozy.triggers'))
  const konnectorTriggers = triggers.filter(trigger =>
    isKonnectorWorker(trigger.attributes)
  )
  const triggerStatesDoc = await fetchTriggerStates(client)
  const previousStates = get(triggerStatesDoc, 'triggerStates', {})
  logger('info', `${konnectorTriggers.length} konnector triggers`)

  const triggerAndNotifsInfo = (await Promise.all(
    konnectorTriggers.map(async trigger => {
      return {
        trigger,
        shouldNotify: await shouldNotify(client, trigger, previousStates)
      }
    })
  )).filter(({ shouldNotify }) => shouldNotify)

  const konnectorSlugs = uniq(
    triggerAndNotifsInfo.map(({ trigger }) => {
      return trigger.message.konnector
    })
  )

  const konnectorNamesBySlug = fromPairs(
    await Promise.all(
      konnectorSlugs.map(async slug => [
        slug,
        get(
          await fetchRegistryInfo(client, slug),
          'latest_version.manifest.name'
        )
      ])
    )
  )

  logger('info', `${triggerAndNotifsInfo.length} konnector triggers to notify`)

  const notifView = buildNotificationView(client, {
    konnectorAlerts: triggerAndNotifsInfo.map(({ trigger }) => {
      const konnectorSlug = trigger.message.konnector
      return {
        konnectorSlug,
        konnectorName: konnectorNamesBySlug[konnectorSlug] || konnectorSlug,
        trigger
      }
    })
  })
  await sendNotification(client, notifView)
  await storeTriggerStates(client, triggers, triggerStatesDoc)
}

const main = async ({ client }) => {
  client.registerPlugin(flag.plugin)
  await client.plugins.flags.refresh()

  if (!flag('banks.konnector-alerts')) {
    logger(
      'info',
      'Bailing out of job notifications service since flag "banks.konnector-alerts" is not set'
    )
    return
  }

  logger('info', 'Executing job notifications service...')
  await sendTriggerNotifications(client)
}

if (require.main === module || process.env.NODE_ENV === 'production') {
  runService(main)
}

export default main
