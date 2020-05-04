import React, { useMemo } from 'react'
import { useClient, useQuery } from 'cozy-client'
import { NestedSelect, useI18n } from 'cozy-ui/transpiled/react'
import { getLabel } from 'ducks/recurrence/utils'
import { recurrenceConn } from 'doctypes'
import { updateTransactionRecurrence } from 'ducks/transactions/helpers'
import CategoryIcon from 'ducks/categories/CategoryIcon'
import { RECURRENCE_DOCTYPE } from 'doctypes'

const optionFromRecurrence = rec => {
  return {
    _id: rec._id,
    title: getLabel(rec),
    icon: <CategoryIcon categoryId={rec.categoryId} />
  }
}

const isSelectedHelper = (item, currentId) => {
  if (item.id === 'not-recurrent' && !currentId) {
    return true
  }
  if (item.id === 'recurrent' && currentId) {
    return true
  }
  if (item._id === currentId) {
    return true
  }
  return false
}

const NOT_RECURRENT_ID = 'not-recurrent'
const RECURRENT_ID = 'recurrent'

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

  const handleSelect = async recurrence => {
    if (beforeUpdate) {
      await beforeUpdate()
    }

    const newTransaction = await updateTransactionRecurrence(
      client,
      transaction,
      recurrence
    )
    if (afterUpdate) {
      await afterUpdate(newTransaction)
    }
  }

  const isSelected = item => isSelectedHelper(item, currentId)

  return (
    <NestedSelect
      radioPosition="left"
      isSelected={isSelected}
      onSelect={handleSelect}
      options={{
        children: [
          {
            _id: NOT_RECURRENT_ID,
            _type: RECURRENCE_DOCTYPE,
            title: t('Recurrence.choice.not-recurrent')
          },
          {
            id: RECURRENT_ID,
            title: t('Recurrence.choice.recurrent'),
            description: current && getLabel(current),
            children: recurrenceOptions
          }
        ]
      }}
    />
  )
}

export default TransactionRecurrenceEditor
