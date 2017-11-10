/* global __TARGET__ */
import flash from 'ducks/flash'

export const openCollect = collectUrl => () => {
  if (__TARGET__ === 'mobile') {
    window.open(collectUrl + '#/providers/banking', '_system')
  } else {
    flash('ComingSoon.description')
  }
}
