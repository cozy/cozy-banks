import GraphCircleIcon from 'cozy-ui/transpiled/react/Icons/GraphCircle'
import SelectAllIcon from 'cozy-ui/transpiled/react/Icons/SelectAll'

export const makeSelectionBarActions = ({
  showTransactionCategoryModal,
  fillSelection
}) => {
  return {
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
  }
}
