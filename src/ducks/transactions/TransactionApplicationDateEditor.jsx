import React from 'react'
import { withClient } from 'cozy-client'
import { Button } from 'cozy-ui/transpiled/react'
import { updateApplicationDate } from 'ducks/transactions/helpers'
import DateMonthPicker from 'components/DateMonthPicker'

const TransactionApplicationDateEditor = withClient(props => {
  const { client, onCancel, transaction, beforeUpdate, afterUpdate } = props
  const handleCancel = () => {
    onCancel(props)
  }

  const handleSelect = async monthDate => {
    await beforeUpdate(props)
    await updateApplicationDate(client, transaction, monthDate)
    await afterUpdate(props, monthDate)
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
