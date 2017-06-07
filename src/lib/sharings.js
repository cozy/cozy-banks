const RECIPIENT_DOCTYPE = 'io.cozy.mocks.recipients'

export function findRecipients (cozy, doctype, id) {
  if (!id) throw new Error('Missing mandatory parameter `id`')

  return cozy.data.find(doctype, id)
    .then(doc => {
      const { recipients } = doc
      const hasRecipients = recipients && recipients.length
      return hasRecipients
        ? Promise.all(
            recipients.map(recipient => cozy.data.find(RECIPIENT_DOCTYPE, recipient.recipient.id))
          )
         : []
    })
}
