import memoize from 'lodash/memoize'
import mapValues from 'lodash/mapValues'
import keyBy from 'lodash/keyBy'

import { Q } from 'cozy-client'

import { SETTINGS_DOCTYPE } from 'doctypes'
import { KonnectorAlertNotification, logger } from 'ducks/konnectorAlerts'
import { dictRequire, lang } from '../service'

const TRIGGER_STATES_DOC_ID = 'trigger-states'

export const getKonnectorSlug = trigger => trigger.message.konnector

export const fetchRegistryInfo = memoize(
  async (client, konnectorSlug) => {
    try {
      return await client.stackClient.fetchJSON(
        'GET',
        `/registry/${konnectorSlug}`
      )
    } catch (e) {
      return {}
    }
  },
  (client, konnectorSlug) => konnectorSlug
)

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

export const destroyObsoleteTrigger = async (client, trigger) => {
  if (trigger?.type === '@at') {
    logger('info', 'Try to destroy @at trigger...')

    const isObsolete = +new Date(trigger?.arguments) < +new Date()

    if (isObsolete) {
      await client.destroy(trigger)
      logger('info', `Destroyed @at trigger with id ${trigger._id}`)
    } else {
      logger(
        'info',
        `Nothing happened, trigger with id ${trigger._id} is not yet obsolete`
      )
    }
  }
}

/** Fetch triggers states from a special doc in the settings */
export const fetchTriggerStates = async client => {
  try {
    const { data } = await client.query(
      Q(SETTINGS_DOCTYPE).getById(TRIGGER_STATES_DOC_ID)
    )
    return data
  } catch {
    return {}
  }
}

/** Stores triggers states in a special doc in the settings */
export const storeTriggerStates = async (client, triggers, previousDoc) => {
  const triggerStatesById = mapValues(
    keyBy(triggers, '_id'),
    trigger => trigger.current_state
  )
  const doc = {
    _id: TRIGGER_STATES_DOC_ID,
    _type: SETTINGS_DOCTYPE,
    triggerStates: triggerStatesById
  }
  if (previousDoc && previousDoc._rev) {
    doc._rev = previousDoc._rev
  }
  return await client.save(doc)
}

export const isErrorActionable = errorMessage => {
  return (
    errorMessage &&
    (errorMessage.startsWith('LOGIN_FAILED') ||
      errorMessage.startsWith('USER_ACTION_NEEDED'))
  )
}
