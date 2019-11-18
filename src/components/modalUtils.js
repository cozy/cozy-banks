import { useState } from 'react'

export const useSwitch = initialState => {
  const [state, setState] = useState(initialState)
  const toggleOn = () => setState(true)
  const toggleOff = () => setState(false)
  return [state, toggleOn, toggleOff]
}
