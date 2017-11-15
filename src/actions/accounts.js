/* global cozy */

import { updateDocuments, deleteDocument, deleteDocuments } from 'cozy-client'

const removeAccountFromGroup = (group, account) => {
  return {
    ...group,
    accounts: group.accounts.filter(accountId => accountId !== account.id)
  }
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
  await dispatch(deleteDocuments('io.cozy.bank.operations', {
    selector: { account: account.id }
  }, {
    updateCollections: ['transactions']
  }))

  return dispatch(deleteDocument(account, {
    updateCollections: ['accounts', 'onboarding_accounts']
  }))
}
