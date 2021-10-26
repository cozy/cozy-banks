import uniq from 'lodash/uniq'
import fromPairs from 'lodash/fromPairs'
import get from 'lodash/get'

import { Q } from 'cozy-client'
import flag from 'cozy-flags'
import { sendNotification } from 'cozy-notifications'

import { TRIGGER_DOCTYPE } from 'doctypes'
import { logger } from 'ducks/konnectorAlerts'
import {
  getKonnectorSlug,
  fetchRegistryInfo,
  buildNotification,
  storeTriggerStates,
  fetchTriggerStates
} from './helpers'
import { shouldNotify } from './shouldNotify'

/**
 * Fetches triggers, filters those for which we can send a notification, and send
 * notifications.
 *
 * @param  {CozyClient} client - Cozy client
 * @return {Promise}
 */
export const sendTriggerNotifications = async (client, serviceTrigger) => {
  const { data: cronKonnectorTriggers } = await client.query(
    Q(TRIGGER_DOCTYPE).where({
      worker: 'konnector'
    })
  )
  const triggerStatesDoc = await fetchTriggerStates(client)
  const previousStates = get(triggerStatesDoc, 'triggerStates', {})
  logger('info', `${cronKonnectorTriggers.length} konnector triggers`)

  const ignoredErrorFlag = flag('banks.konnector-alerts.ignored-errors')
  const ignoredErrors = new Set(
    ignoredErrorFlag ? ignoredErrorFlag.split(',') : []
  )

  const triggerAndNotifsInfo = (await Promise.all(
    cronKonnectorTriggers.map(async trigger => {
      return {
        trigger,
        shouldNotify: await shouldNotify({
          client,
          trigger,
          previousStates,
          serviceTrigger
        })
      }
    })
  )).filter(({ trigger, shouldNotify }) => {
    if (shouldNotify.ok || ignoredErrors.has(shouldNotify.reason)) {
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
          'latest_version.manifest.name',
          slug
        )
      ])
    )
  )

  logger('info', `${triggerAndNotifsInfo.length} konnector triggers to notify`)

  if (triggerAndNotifsInfo.length) {
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
  }

  await storeTriggerStates(client, cronKonnectorTriggers, triggerStatesDoc)
}
