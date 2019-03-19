import PinGuard from './PinGuard'
import React from 'react'

const pinGuarded = pinGuardProps => Component => {
  const Wrapped = props => (
    <PinGuard {...pinGuardProps}>
      <Component {...props} />
    </PinGuard>
  )
  Wrapped.displayName = 'PinGuarded__' + Component.displayName
  return Wrapped
}

export default pinGuarded
