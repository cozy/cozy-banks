import last from 'lodash/last'
import get from 'lodash/get'

/**
 * Returns the changes or all documents. If we want to fetch all changes, it is
 * more efficient to fetch all the documents, because we don't have to check the
 * whole history of each document.
 *
 * @param {Object} Model - A cozy-doctypes' model class
 * @param {string} lastSeq - The lastSeq from which you want to fetch the changes. If you give '0', then all documents will be fetched
 *
 * @return {Object} an object containing the `documents` and the `newLastSeq`
 */
export const fetchChangesOrAll = async (Model, lastSeq) => {
  if (lastSeq === '0') {
    // If we want to fetch all changes, it is more efficient to fetch all the
    // documents. But we still need to return a `lastSeq` just as if we really
    // fetched changes. So we fetch only the very last change to have the
    // lastSeq.
    // This should be done first to avoid a race condition: if we fetch all
    // documents then fetch the last change, a document could have been created
    // between the two, and it will not be part of the documents returned. Since
    // the lastSeq includes it, it will not be returned next time either.
    const lastChanges = await Model.fetchChanges('', {
      descending: true,
      limit: 1
    })

    const documents = await Model.fetchAll()

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
