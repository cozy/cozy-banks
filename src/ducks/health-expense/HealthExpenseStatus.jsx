import React from 'react'
import { translate, Icon } from 'cozy-ui/react'
import { formatVendor } from './helpers'
import palette from 'cozy-ui/stylus/settings/palette.json'

const healthExpenseStatusIconStyle = { display: 'inline-block' }
export const HealthExpenseStatusIcon = ({ className = '', pending }) => {
  const color = pending ? palette.pomegranate : palette.dodgerBlue

  return (
    <span style={healthExpenseStatusIconStyle} className={className}>
      <Icon icon="hourglass" color={color} />
    </span>
  )
}

const HealthExpenseStatus = translate()(
  ({ t, vendors = [], showIcon = true }) => {
    const pending = vendors.length === 0
    const formattedVendors = vendors.map(formatVendor)

    return (
      <span>
        {showIcon && (
          <HealthExpenseStatusIcon className="u-mr-half" pending={pending} />
        )}
        {pending
          ? t('Transactions.actions.healthExpensePending')
          : t('Transactions.actions.healthExpenseStatus').replace(
              '%{vendors}',
              formattedVendors.join(
                ` ${t('Transactions.actions.vendorsGlue')} `
              )
            )}
      </span>
    )
  }
)

export default HealthExpenseStatus
