import mapValues from 'lodash/mapValues'
import keyBy from 'lodash/keyBy'
import uniq from 'lodash/uniq'
import fromPairs from 'lodash/fromPairs'
import get from 'lodash/get'

import { Q, models } from 'cozy-client'
import flag from 'cozy-flags'
import { sendNotification } from 'cozy-notifications'

import { runService, dictRequire, lang } from './service'
import { KonnectorAlertNotification, logger } from 'ducks/konnectorAlerts'

const { isKonnectorWorker } = models.trigger.triggers

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
    triggerStates: triggerStatesById
  }
  if (previousDoc && previousDoc._rev) {
    doc._rev = previousDoc._rev
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
 *
 * @typedef {Object} ShouldNotifyResult
 * @property {number} ok - Whether the trigger generates a notification
 * @property {number} reason - If ok=false, describes why.
 *
 * @return {ShouldNotifyResult}
 */
const shouldNotify = async (client, trigger, previousStatesByTriggerId) => {
  const previousState = previousStatesByTriggerId[trigger._id]
  if (
    !previousState &&
    !flag('banks.konnector-alerts.ignore-previous-status')
  ) {
    return { ok: false, reason: 'no-previous-state' }
  }

  if (
    previousState.status !== 'done' &&
    !flag('banks.konnector-alerts.ignore-previous-status')
  ) {
    return { ok: false, reason: 'previous-state-is-error' }
  }

  if (trigger.current_state.status !== 'errored') {
    return { ok: false, reason: 'current-state-is-not-errored' }
  }

  if (!isErrorActionable(trigger.current_state.last_error)) {
    return { ok: false, reason: 'error-not-actionable' }
  }

  // We do not want to send notifications for jobs that were launched manually
  const jobId = trigger.current_state.last_executed_job_id
  const { data: job } = await client.query(Q('io.cozy.jobs').getById(jobId))
  if (
    job.manual_execution &&
    !flag('banks.konnector-alerts.allow-manual-jobs')
  ) {
    return { ok: false, reason: 'manual-job' }
  }

  return { ok: true }
}

const fetchRegistryInfo = async (client, konnectorSlug) => {
  return client.stackClient.fetchJSON('GET', `/registry/${konnectorSlug}`)
}

/**
 * Build the notification for konnector alerts
 *
 * @param  {CozyClient} client - Cozy client
 * @param  {object} options - Options
 * @param  {Array.<KonnectorAlert>} options.konnectorAlerts - Alerts to include in the notification
 * @return {NotificationView} - The konnector alerts notification view
 */
export const buildNotification = (client, options) => {
  const notification = new KonnectorAlertNotification({
    client,
    lang,
    data: {},
    locales: {
      [lang]: dictRequire(lang)
    },
    ...options
  })
  return notification
}

const getKonnectorSlug = trigger => trigger.message.konnector

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
  )).filter(({ trigger, shouldNotify }) => {
    if (shouldNotify.ok) {
      logger('info', `Will notify trigger for ${getKonnectorSlug(trigger)}`)
      return true
    } else {
      logger(
        'info',
        `Will not notify trigger for ${getKonnectorSlug(trigger)} because ${
          shouldNotify.reason
        }`
      )
      return false
    }
  })

  const konnectorSlugs = uniq(
    triggerAndNotifsInfo.map(({ trigger }) => getKonnectorSlug(trigger))
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

  const notifView = buildNotification(client, {
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
