import React from 'react'
import { withClient } from 'cozy-client'
import { Button, DateMonthPicker } from 'cozy-ui/transpiled/react'
import { updateApplicationDate } from 'ducks/transactions/helpers'

const TransactionApplicationDateEditor = withClient(props => {
  const { client, onCancel, transaction, beforeUpdate, afterUpdate } = props
  const handleCancel = () => onCancel()

  const handleSelect = async monthDate => {
    await beforeUpdate(props)
    const newTransaction = await updateApplicationDate(
      client,
      transaction,
      monthDate
    )
    await afterUpdate(newTransaction)
  }

  return (
    <div className="u-p-half">
      <DateMonthPicker
        initialValue={(transaction.applicationDate || transaction.date).slice(
          0,
          10
        )}
        onSelect={handleSelect}
      />
      <br />
      <Button
        size="small"
        className="u-m-0"
        theme="secondary"
        onClick={handleCancel}
      >
        Cancel
      </Button>
    </div>
  )
})

export default TransactionApplicationDateEditor
