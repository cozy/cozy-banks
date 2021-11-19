import React, { createContext, useContext, useMemo, useState } from 'react'

export const REQUEST_FAILED = 'REQUEST_FAILED'

export const RequestStateContext = createContext()

export const useRequestStateContext = () => {
  const context = useContext(RequestStateContext)
  if (!context)
    throw new Error(
      'RequestStateContext is unavailable. There is no NetworkState provider, or it is not loaded yet.'
    )
  return context
}

export const withRequestState = Component => {
  const WrappedComponent = props => {
    const requestStateContext = useRequestStateContext()
    return <Component requestStateContext={requestStateContext} {...props} />
  }
  WrappedComponent.displayName = `withClient(${Component.displayName})`
  return WrappedComponent
}

const RequestStateProvider = ({ children }) => {
  const [requestState, setRequestState] = useState()

  const value = useMemo(
    () => ({
      requestState,
      setRequestState
    }),
    [requestState, setRequestState]
  )

  return (
    <RequestStateContext.Provider value={value}>
      {children}
    </RequestStateContext.Provider>
  )
}

export default RequestStateProvider
