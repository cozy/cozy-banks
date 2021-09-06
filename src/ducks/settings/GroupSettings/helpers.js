export const updateOrCreateGroup = async (
  client,
  group,
  router,
  successCallback
) => {
  const isNew = !group.id
  try {
    const response = await client.save(group)
    if (response && response.data) {
      const doc = response.data
      if (isNew) {
        router.push(`/settings/groups/${doc.id}`)
      }
    }
  } finally {
    successCallback && successCallback()
  }
}

export const makeNewGroup = (client, t) => {
  const obj = client.makeNewDocument('io.cozy.bank.groups')
  obj.label = t('Groups.new-group')
  return obj
}
