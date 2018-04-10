/* global cozy */

import { deleteAll, queryAll } from 'utils/stack'
import { updateDocuments, deleteDocument, deleteDocuments } from 'cozy-client'
import { TRANSACTION_DOCTYPE } from 'doctypes'

const removeAccountFromGroup = (group, account) => {
  return {
    ...group,
    accounts: group.accounts.filter(accountId => accountId !== account.id)
  }
}

const deleteOrphanOperations = async ({ accountId }) => {
  const index = await cozy.client.data.defineIndex(TRANSACTION_DOCTYPE, [
    'account'
  ])
  const orphanOperations = await queryAll(index, {
    selector: { account: accountId }
  })
  return deleteAll(TRANSACTION_DOCTYPE, orphanOperations)
}

export const DESTROY_ACCOUNT = 'DESTROY_ACCOUNT'
export const destroyAccount = account => async (dispatch, getState) => {
  dispatch({ type: DESTROY_ACCOUNT, account })
  await dispatch(
    updateDocuments(
      'io.cozy.bank.groups',
      {
        // If necessary we could perform a more performant
        // query by only fetching groups that contains the account
        selector: { _id: { $gt: null } }
      },
      group => removeAccountFromGroup(group, account),
      {
        updateCollections: ['groups']
      }
    )
  )

  await dispatch(
    deleteDocuments(
      TRANSACTION_DOCTYPE,
      {
        selector: { account: account.id }
      },
      {
        updateCollections: ['transactions']
      }
    )
  )

  await deleteOrphanOperations({ accountId: account.id })

  return dispatch(
    deleteDocument(account, {
      updateCollections: ['accounts', 'onboarding_accounts']
    })
  )
}
