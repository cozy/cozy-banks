import set from 'lodash/set'
import flatten from 'lodash/flatten'
import omit from 'lodash/omit'
import { dehydrate } from 'cozy-client'

const RECURRENCE_DOCTYPE = 'io.cozy.bank.recurrence'

const addRelationship = (doc, relationshipName, definition) => {
  return set(doc, ['relationships', relationshipName], definition)
}

export const saveBundles = async (client, clientBundles) => {
  const recurrenceCol = client.collection(RECURRENCE_DOCTYPE)
  const saveBundlesResp = await recurrenceCol.updateAll(
    clientBundles.map(bundle => omit(bundle, 'ops'))
  )
  const bundlesWithIds = clientBundles.map((bundle, i) => ({
    ...bundle,
    _id: saveBundlesResp[i].id
  }))
  const ops = flatten(
    bundlesWithIds.map(bundle =>
      bundle.ops.map(op =>
        dehydrate(
          addRelationship(op, 'bundle', {
            _id: bundle._id,
            _type: RECURRENCE_DOCTYPE
          })
        )
      )
    )
  )
  const opCollection = client.collection('io.cozy.bank.operations')
  await opCollection.updateAll(ops.map(op => omit(op, '_type')))
}

export const resetBundles = async client => {
  const recurrenceCol = client.collection(RECURRENCE_DOCTYPE)
  const { data: serverBundles } = await recurrenceCol.all()
  await recurrenceCol.deleteAll(serverBundles)
}
