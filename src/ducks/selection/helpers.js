import { useCallback, useMemo } from 'react'

import GraphCircleIcon from 'cozy-ui/transpiled/react/Icons/GraphCircle'
import SelectAllIcon from 'cozy-ui/transpiled/react/Icons/SelectAll'

import { useSelectionContext } from 'ducks/context/SelectionContext'

export const useSelectionBarActions = ({
  items,
  showTransactionCategoryModal
}) => {
  const { fillSelectionWith } = useSelectionContext()

  const fillSelection = useCallback(() => fillSelectionWith(items), [
    fillSelectionWith,
    items
  ])

  const actions = useMemo(
    () => ({
      categorize: {
        action: () => showTransactionCategoryModal(),
        displayCondition: selected => selected.length > 0,
        icon: GraphCircleIcon
      },
      selectAll: {
        action: () => fillSelection(),
        displayCondition: selected => selected.length > 0,
        icon: SelectAllIcon
      }
    }),
    [fillSelection, showTransactionCategoryModal]
  )

  return actions
}
