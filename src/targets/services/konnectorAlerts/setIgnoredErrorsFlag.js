import { Q } from 'cozy-client'
import flag from 'cozy-flags'

import { TRIGGER_DOCTYPE, JOBS_DOCTYPE } from 'doctypes'
import { logger } from 'ducks/konnectorAlerts'

export const setIgnoredErrorsFlag = async client => {
  let serviceTrigger = undefined
  let serviceJob = undefined
  const triggerId = process.env.COZY_TRIGGER_ID
  const jobId = process.env.COZY_JOB_ID?.split('/').pop()

  logger(
    'info',
    `Executing job notifications service by trigger: ${triggerId}, job: ${jobId}...`
  )

  try {
    const { data } = await client.query(Q(TRIGGER_DOCTYPE).getById(triggerId))
    serviceTrigger = data
  } catch (e) {
    logger(
      'error',
      `❗ Error when getting trigger with id: ${triggerId}, reason: ${e.message}`
    )
  }

  try {
    const { data } = await client.query(Q(JOBS_DOCTYPE).getById(jobId))
    serviceJob = data
  } catch (e) {
    logger(
      'error',
      `❗ Error when getting job with id: ${jobId}, reason: ${e.message}`
    )
  }

  const forcedIgnoredErrors =
    serviceTrigger?.message?.forceIgnoredErrors ||
    serviceJob?.message?.forceIgnoredErrors

  if (forcedIgnoredErrors) {
    flag('banks.konnector-alerts.ignored-errors', forcedIgnoredErrors)
    logger(
      'info',
      `Forced flag banks.konnector-alerts.ignored-errors to: ${forcedIgnoredErrors}`
    )
  }
}
