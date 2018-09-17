import { deleteAll } from 'utils/stack'
import CozyClient from 'cozy-client'
import { GROUP_DOCTYPE, ACCOUNT_DOCTYPE } from 'doctypes'
import { getLinks } from 'ducks/client/links'

const removeAccountFromGroup = (group, account) => {
  return {
    ...group,
    accounts: group.accounts.filter(accountId => accountId !== account.id)
  }
}

const getStackCollection = doctype => {
  const links = getLinks()
  return links.stack.client.collection(doctype)
}

const deleteOrphanOperations = async (client, account) => {
  const links = getLinks()
  const accountCollection = getStackCollection(ACCOUNT_DOCTYPE)
  const orphanOperations = (await accountCollection.find({
    account: account._id
  })).data
  if (orphanOperations.length > 0) {
    const stackClient = links.stack.client
    return deleteAll(client, stackClient, orphanOperations)
  }
}

const removeAccountFromGroups = async account => {
  const groupCollection = getStackCollection(GROUP_DOCTYPE)
  const groups = (await groupCollection.all(GROUP_DOCTYPE)).data
  const ugroups = groups.map(group => removeAccountFromGroup(group, account))
  for (let ugroup of ugroups) {
    await groupCollection.update(ugroup)
  }
}

export const DESTROY_ACCOUNT = 'DESTROY_ACCOUNT'
export const destroyReferences = async (client, account) => {
  await deleteOrphanOperations(client, account)
  await removeAccountFromGroups(account)
}

CozyClient.registerHook(ACCOUNT_DOCTYPE, 'before:destroy', destroyReferences)
