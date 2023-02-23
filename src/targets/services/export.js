import flag from 'cozy-flags'
import logger from 'ducks/export/logger'
import { runService } from './service'

const main = async ({ client }) => {
  if (require.main !== module && process.env.NODE_ENV !== 'production') {
    client.registerPlugin(flag.plugin)
    await client.plugins.flags.refresh()
  }
  if (!flag('banks.services.export.enabled')) {
    logger(
      'info',
      'Bailing out of export service since flag "banks.services.export.enabled" is not set to `true`'
    )
    return
  }

  logger('info', 'Export service success')
}

if (require.main === module || process.env.NODE_ENV === 'production') {
  runService(main)
}

export default main
