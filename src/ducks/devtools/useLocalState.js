import { useState, useCallback } from 'react'

const useLocalState = (key, initialState) => {
  const [state, setState] = useState(() => {
    const item = localStorage.getItem(key)
    try {
      return item !== null ? JSON.parse(item) : initialState
    } catch (e) {
      return initialState
    }
  })

  const setLocalState = useCallback(
    newState => {
      setState(newState)
      localStorage.setItem(key, JSON.stringify(newState))
    },
    [setState, key]
  )

  return [state, setLocalState]
}

export default useLocalState
