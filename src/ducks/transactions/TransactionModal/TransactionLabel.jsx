import React from 'react'

import Typography from 'cozy-ui/transpiled/react/Typography'

import { getLabel, isTransactionEditable } from 'ducks/transactions/helpers'
import SearchForTransactionIcon from 'ducks/transactions/TransactionModal/SearchForTransactionIcon'
import LabelField from 'ducks/transactions/TransactionRow/LabelField'

const TransactionLabel = ({ transaction }) => {
  const label = getLabel(transaction)

  return (
    <div className="u-flex u-mb-half">
      {isTransactionEditable(transaction) ? (
        <LabelField transaction={transaction} variant="h6" />
      ) : (
        <Typography
          variant="h6"
          gutterBottom
          className="u-ellipsis"
          title={label}
        >
          {label}
        </Typography>
      )}{' '}
      <SearchForTransactionIcon transaction={transaction} />
    </div>
  )
}

export default React.memo(TransactionLabel)
