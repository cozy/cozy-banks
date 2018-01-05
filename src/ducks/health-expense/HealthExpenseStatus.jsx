import React from 'react'
import { translate } from 'cozy-ui/react'

const formatVendor = vendor => {
  const vendorsMap = {
    Ameli: 'CPAM'
  }

  return vendorsMap[vendor] || vendor
}

const HealthExpenseStatus = translate()(({
  className,
  color,
  t,
  vendors = []
}) => {
  const pending = vendors.length === 0
  const formattedVendors = vendors.map(formatVendor)

  return (
    <span
      style={{ color }}
      className={className}>
      {pending
        ? t('Transactions.actions.healthExpensePending')
        : t('Transactions.actions.healthExpenseStatus').replace('%{vendors}', formattedVendors.join(` ${t('Transactions.actions.vendorsGlue')} `))
      }

    </span>
  )
})

export default HealthExpenseStatus
