import React, { useState, useContext } from 'react'
import SwipeableViews from 'react-swipeable-views'

const STEPPER_TRANSITION_DURATION_MS = 500

export const StackContext = React.createContext()
export const useViewStack = () => useContext(StackContext)

const sleep = duration => new Promise(resolve => setTimeout(resolve, duration))

const useStack = initialState => {
  const [arr, setArray] = useState(initialState)
  const [curIndex, setCurIndex] = useState(initialState.length - 1)

  const push = item => {
    const newArr = [...arr, item]
    setArray(newArr)
    setCurIndex(curIndex + 1)
  }

  const pop = async () => {
    const newArr = arr.slice(0, -1)
    setCurIndex(curIndex - 1)
    await sleep(STEPPER_TRANSITION_DURATION_MS)
    setArray(newArr)
  }

  return [arr, curIndex, push, pop]
}

const StepperStack = ({ children }) => {
  const [stChildren, curIndex, stackPush, stackPop] = useStack(
    React.Children.toArray(children)
  )

  const contextValue = { stackPush, stackPop }

  return (
    <StackContext.Provider value={contextValue}>
      <SwipeableViews animateHeight disabled index={curIndex}>
        {stChildren.map((child, i) =>
          React.cloneElement(child, {
            key: i,
            active: i === curIndex
          })
        )}
      </SwipeableViews>
    </StackContext.Provider>
  )
}

export default StepperStack
