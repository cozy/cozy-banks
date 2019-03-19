import PinGuard from './PinGuard'

const pinGuarded = pinGuardProps => Component => props => (
  <PinGuard {...pinGuardProps}>
    <Component {...props} />
  </PinGuard>
)

export default pinGuarded
