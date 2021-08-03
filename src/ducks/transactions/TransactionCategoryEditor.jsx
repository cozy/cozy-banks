import React, { useMemo, useCallback } from 'react'
import { useClient } from 'cozy-client'
import {
  setTransactionCategory,
  getCategoryId
} from 'ducks/transactions/helpers'
import CategoryChoice from 'ducks/categories/CategoryChoice'

/**
 * Edits a transaction's category through CategoryChoice
 */
const TransactionCategoryEditor = ({
  transactions,
  beforeUpdates,
  afterUpdates,
  onCancel
}) => {
  const client = useClient()
  const categoryId = useMemo(() => getCategoryId(transactions[0]), [
    transactions
  ])

  const handleSelectCategory = useCallback(
    async category => {
      if (beforeUpdates) {
        await beforeUpdates()
      }

      const newTransactions = transactions.map(transaction =>
        setTransactionCategory(transaction, category)
      )

      await client.saveAll(newTransactions)

      if (afterUpdates) {
        afterUpdates(newTransactions)
      }
    },
    [afterUpdates, beforeUpdates, client, transactions]
  )

  const handleCancel = useCallback(async () => {
    await onCancel()
  }, [onCancel])

  return (
    <CategoryChoice
      modal={true}
      categoryId={categoryId}
      onSelect={handleSelectCategory}
      onCancel={handleCancel}
    />
  )
}

TransactionCategoryEditor.defaultProps = {
  modal: false
}

export default React.memo(TransactionCategoryEditor)
