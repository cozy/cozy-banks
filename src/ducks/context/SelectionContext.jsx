import React, {
  createContext,
  useState,
  useCallback,
  useEffect,
  useContext,
  useMemo
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
  const [isSelectionModeActive, setIsSelectionModeActive] = useState(false)
  const [selected, setSelected] = useState([])

  const isSelectionModeEnabled = flag('banks.selectionMode.enabled')

  const activateSelectionMode = useCallback(
    () => isSelectionModeEnabled && setIsSelectionModeActive(true),
    [isSelectionModeEnabled]
  )

  const deactivateSelectionMode = useCallback(
    () => setIsSelectionModeActive(false),
    [setIsSelectionModeActive]
  )

  const addToSelection = useCallback(
    item => {
      setSelected(v => [...v, item])
    },
    [setSelected]
  )

  const removeFromSelection = useCallback(
    item => {
      setSelected(v => v.filter(e => e._id !== item._id))
    },
    [setSelected]
  )

  const emptySelection = useCallback(() => setSelected([]), [setSelected])

  const isSelected = useCallback(item => selected.includes(item), [selected])

  const toggleSelection = useCallback(
    item => {
      if (isSelectionModeEnabled) {
        isSelected(item) ? removeFromSelection(item) : addToSelection(item)
      }
    },
    [isSelectionModeEnabled, isSelected, removeFromSelection, addToSelection]
  )

  useEffect(() => {
    if (isSelectionModeActive && selected.length === 0) {
      deactivateSelectionMode()
    }
    if (!isSelectionModeActive && selected.length > 0) {
      activateSelectionMode()
    }
  }, [
    selected,
    activateSelectionMode,
    isSelectionModeActive,
    deactivateSelectionMode
  ])

  const value = useMemo(
    () => ({
      selected,
      isSelectionModeActive,
      isSelectionModeEnabled,
      isSelected,
      emptySelection,
      toggleSelection
    }),
    [
      selected,
      isSelectionModeActive,
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
