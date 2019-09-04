import last from 'lodash/last'
import get from 'lodash/get'

/**
 * If lastSeq is 0, it's more efficient to fetch all documents.
 */
export const fetchChangesOrAll = async (Model, lastSeq) => {
  if (lastSeq === '0') {
    const documents = await Model.fetchAll()
    // fetch last change to have the last_seq
    const lastChanges = await Model.fetchChanges('', {
      descending: true,
      limit: 1
    })
    return { documents, newLastSeq: lastChanges.newLastSeq }
  } else {
    return Model.fetchChanges(lastSeq)
  }
}

const getJobIdFromEnv = env => {
  const cozyJobId = env.COZY_JOB_ID
  const jobId = last(cozyJobId.split('/'))

  return jobId
}

const getOptionsFromEnv = async (client, env) => {
  const jobId = getJobIdFromEnv(env)
  const job = await client.fetchJSON('GET', `/jobs/${jobId}`)

  return get(job, 'attributes.message.arguments')
}

const getOptionsFromCLI = argv => {
  try {
    return JSON.parse(argv.slice(-1)[0])
  } catch (e) {
    return {}
  }
}

export const getOptions = async (
  client,
  env = process.env,
  argv = process.argv
) => {
  const optsFromEnv = await getOptionsFromEnv(client, env)
  const optsFromCLI = getOptionsFromCLI(argv)

  const options = {
    ...optsFromEnv,
    ...optsFromCLI
  }

  return options
}
