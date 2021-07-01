import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useMemo,
  useRef
} from 'react'

import flag from 'cozy-flags'

export const SelectionContext = createContext()

export const useSelectionContext = () => {
  return useContext(SelectionContext)
}

// TODO: SelectionProvider stores the entire elements in an array
// instead of just their ids. This is not critical since we
// imagine that there are quite few elements.
// But an improvement would be to store only the ids.
const SelectionProvider = ({ children }) => {
  const [selected, setSelected] = useState([])
  const selectedRef = useRef(selected)
  selectedRef.current = selected

  const isSelectionModeEnabled = flag('banks.selectionMode.enabled')

  const emptySelection = useCallback(() => setSelected([]), [setSelected])

  const isSelected = useCallback(item => selected.includes(item), [selected])

  const isSelectionModeActiveFn = useCallback(() => {
    return selectedRef.current.length > 0
  }, [])

  const toggleSelection = useCallback(
    item => {
      if (!isSelectionModeEnabled) {
        return
      }
      return setSelected(selected => {
        const found = selected.includes(item)
        return found
          ? selected.filter(elem => elem !== item)
          : [...selected, item]
      })
    },
    [isSelectionModeEnabled]
  )

  const value = useMemo(
    () => ({
      selected,
      isSelectionModeActive: selected.length > 0,
      // Only used this in callbacks since its value is not reactive
      isSelectionModeActiveFn,
      isSelectionModeEnabled,
      isSelected,
      emptySelection,
      toggleSelection
    }),
    [
      selected,
      isSelectionModeActiveFn,
      isSelectionModeEnabled,
      isSelected,
      emptySelection,
      toggleSelection
    ]
  )

  return (
    <SelectionContext.Provider value={value}>
      {children}
    </SelectionContext.Provider>
  )
}

export default SelectionProvider
