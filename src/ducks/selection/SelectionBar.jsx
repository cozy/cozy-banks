import React, { useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'

import UISelectionBar from 'cozy-ui/transpiled/react/SelectionBar'
import Alerter from 'cozy-ui/transpiled/react/Alerter'
import { useI18n } from 'cozy-ui/transpiled/react/I18n'

import { useSelectionContext } from 'ducks/context/SelectionContext'
import { makeSelectionBarActions } from 'ducks/selection/helpers'
import { useTransactionCategoryModal } from 'ducks/transactions/TransactionRow'

const SelectionBar = ({ transactions }) => {
  const {
    isSelectionModeEnabled,
    isSelectionModeActive,
    selected,
    emptyAndDeactivateSelection,
    fillSelectionWith
  } = useSelectionContext()

  const { t } = useI18n()

  const beforeUpdate = useCallback(() => {
    emptyAndDeactivateSelection()
  }, [emptyAndDeactivateSelection])

  const afterUpdates = () => {
    Alerter.success(
      t('Categorization.success', {
        smart_count: selected.length
      })
    )
  }

  const [
    showTransactionCategoryModal,
    ,
    transactionCategoryModal
  ] = useTransactionCategoryModal({
    transactions: selected,
    beforeUpdate,
    afterUpdates
  })

  const fillSelection = useCallback(() => fillSelectionWith(transactions), [
    fillSelectionWith,
    transactions
  ])

  const actions = useMemo(
    () =>
      makeSelectionBarActions({
        showTransactionCategoryModal,
        fillSelection
      }),
    [fillSelection, showTransactionCategoryModal]
  )

  if (!isSelectionModeEnabled) return null
  return (
    <>
      {isSelectionModeActive && (
        <UISelectionBar
          actions={actions}
          selected={selected}
          hideSelectionBar={emptyAndDeactivateSelection}
        />
      )}
      {transactionCategoryModal}
    </>
  )
}

SelectionBar.propTypes = {
  transactions: PropTypes.array
}

export default React.memo(SelectionBar)
