import React from 'react'
import { translate } from 'cozy-ui/react'
import { formatVendor } from './helpers'

const HealthExpenseStatus = translate()(({
  t,
  vendors = []
}) => {
  const pending = vendors.length === 0
  const formattedVendors = vendors.map(formatVendor)

  return (
    <span>
      {pending
        ? t('Transactions.actions.healthExpensePending')
        : t('Transactions.actions.healthExpenseStatus').replace('%{vendors}', formattedVendors.join(` ${t('Transactions.actions.vendorsGlue')} `))
      }

    </span>
  )
})

export default HealthExpenseStatus
