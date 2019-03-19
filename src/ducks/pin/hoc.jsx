import PinGuard from './PinGuard' 

const pinGuarded = Component => props => (
  <PinGuard timeout={30 * 1000}>
    <Component {...props} />
  </PinGuard>
)

const noop = x => x

export default pinGuarded
