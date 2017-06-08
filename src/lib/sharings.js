const RECIPIENT_DOCTYPE = 'io.cozy.mocks.recipients'

export function findSharing (cozy, doctype, id) {
  if (!id) throw new Error('Missing mandatory parameter `id`')

  const sharing = {
    sharing_type: 'master-slave'
  }

  return cozy.data.find(doctype, id)
    .then(account => {
      sharing.account = account
      const { recipients } = account
      const hasRecipients = recipients && recipients.length
      return hasRecipients
        ? Promise.all(
            recipients.map(recipient => cozy.data.find(RECIPIENT_DOCTYPE, recipient.recipient.id))
          )
         : []
    }).then(recipients => {
      sharing.recipients = recipients
      return sharing
    })
}
