import React, { useMemo } from 'react'
import { useClient, useQuery } from 'cozy-client'
import { NestedSelect, useI18n } from 'cozy-ui/transpiled/react'
import { prettyLabel } from 'ducks/recurrence/utils'
import { recurrenceConn } from 'doctypes'
import { updateTransactionRecurrence } from 'ducks/transactions/helpers'

const optionFromRecurrence = rec => {
  return {
    _id: rec._id,
    title: prettyLabel(rec.label)
  }
}

const TransactionRecurrenceEditor = ({
  transaction,
  beforeUpdate,
  afterUpdate
}) => {
  const { t } = useI18n()
  const client = useClient()

  const current = transaction.recurrence.data
  const currentId = current && current._id
  const { data: allRecurrences } = useQuery(
    recurrenceConn.query,
    recurrenceConn
  )

  const recurrenceOptions = useMemo(
    () => allRecurrences.map(optionFromRecurrence),
    [allRecurrences]
  )

  const handleSelect = async category => {
    if (beforeUpdate) {
      await beforeUpdate()
    }
    const newTransaction = await updateTransactionRecurrence(
      client,
      transaction,
      category
    )
    if (afterUpdate) {
      await afterUpdate(newTransaction)
    }
  }

  return (
    <>
      <NestedSelect
        isSelected={x => x._id == currentId}
        onSelect={handleSelect}
        onBef
        options={{
          children: [
            { title: t('Recurrence.choice.none') },
            ...recurrenceOptions
          ]
        }}
      />
    </>
  )
}

export default TransactionRecurrenceEditor
