import styles from 'styles/nav'

import React, { Component } from 'react'
import classNames from 'classnames'
import { translate } from 'lib/I18n'
import { Link, withRouter } from 'react-router'
import { connect } from 'react-redux'

import Spinner from 'components/Spinner'

class ActiveLink extends Component {
  constructor (props) {
    super(props)
    this.state = {
      opening: false
    }
  }

  open (e) {
//    this.setState({ opening: true })
//    this.props.onClick()
//      .then(() => this.setState({ opening: false }))
  }

  render ({ to, className, children }, { opening }) {
    return (
      <Link to={to} className={className} onClick={e => this.open(e)}>
        {children}
        {opening && <Spinner />}
      </Link>
    )
  }
}

const Nav = ({ t, router }) => {
  return (
    <nav>
      <ul class={styles['coz-nav']}>
        <li class={styles['coz-nav-item']}>
          <ActiveLink
            to='/currentBalance'
            className={classNames(
              styles['coz-nav-link'],
              styles['bnk-cat-balance'],
              { [styles['active']]: router.isActive('currentBalance') }
            )}
          >
            Solde actuel
          </ActiveLink>
        </li>
        <li class={styles['coz-nav-item']}>
          <ActiveLink
            to='/movements'
            className={classNames(
              styles['coz-nav-link'],
              styles['bnk-cat-movements'],
              { [styles['active']]: router.isActive('movements') }
            )}
          >
            Mouvements
          </ActiveLink>
        </li>
        <li class={styles['coz-nav-item']}>
          <ActiveLink
            to='/categories'
            className={classNames(
              styles['coz-nav-link'],
              styles['bnk-cat-categories'],
              { [styles['active']]: router.isActive('categories') }
            )}
          >
            Categorisation
          </ActiveLink>
        </li>
        <li class={styles['coz-nav-item']}>
          <ActiveLink
            to='/projections'
            className={classNames(
              styles['coz-nav-link'],
              styles['bnk-cat-projections'],
              { [styles['active']]: router.isActive('projections') }
            )}
          >
            Prévisions
          </ActiveLink>
        </li>
        <li class={styles['coz-nav-item']}>
          <ActiveLink
            to='/savings'
            className={classNames(
              styles['coz-nav-link'],
              styles['bnk-cat-savings'],
              { [styles['active']]: router.isActive('savings') }
            )}
          >
            Economiser
          </ActiveLink>
        </li>
        <li class={styles['coz-nav-item']}>
          <ActiveLink
            to='/settings'
            className={classNames(
              styles['coz-nav-link'],
              styles['bnk-cat-settings'],
              { [styles['active']]: router.isActive('settings') }
            )}
          >
            Parametres
          </ActiveLink>
        </li>
      </ul>
    </nav>
  )
}

const mapStateToProps = (state, ownProps) => ({
})
const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(translate()(Nav))
)
