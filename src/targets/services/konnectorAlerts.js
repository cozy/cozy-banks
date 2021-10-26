import { Q } from 'cozy-client'
import flag from 'cozy-flags'

import { TRIGGER_DOCTYPE, JOBS_DOCTYPE } from 'doctypes'
import { logger } from 'ducks/konnectorAlerts'
import { runService } from './service'
import { destroyObsoleteTrigger } from './konnectorAlerts/helpers'
import { sendTriggerNotifications } from './konnectorAlerts/sendTriggerNotifications'

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

  const triggerId = process.env.COZY_TRIGGER_ID
  const jobId = process.env.COZY_JOB_ID?.split('/').pop()

  logger(
    'info',
    `Executing job notifications service by trigger: ${triggerId}, job: ${jobId}...`
  )

  const serviceTrigger = triggerId
    ? (await client.query(Q(TRIGGER_DOCTYPE).getById(triggerId))).data
    : undefined

  const serviceJob = jobId
    ? (await client.query(Q(JOBS_DOCTYPE).getById(jobId))).data
    : undefined

  // Used to execute a script on maif instance
  // that force the execution of this service
  // TODO should be removed after executing the script
  if (serviceJob?.message?.forceIgnoredErrors) {
    flag(
      'banks.konnector-alerts.ignored-errors',
      serviceJob.message.forceIgnoredErrors
    )
    logger(
      'info',
      `Forced flag banks.konnector-alerts.ignored-errors to: ${serviceJob.message.forceIgnoredErrors}`
    )
  }

  await sendTriggerNotifications(client, serviceTrigger)
  await destroyObsoleteTrigger(client, serviceTrigger)
}

if (require.main === module || process.env.NODE_ENV === 'production') {
  runService(main)
}

export default main
