import { runService } from './service'
import { doRecurrenceMatching } from 'ducks/recurrence/service'

runService(async ({ client }) => {
  await doRecurrenceMatching(client)
})
