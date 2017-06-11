import styles from 'styles/nav'

import React, { Component } from 'react'
import classNames from 'classnames'
import { translate } from 'cozy-ui/react/I18n'
import { Link, withRouter } from 'react-router'
import { connect } from 'react-redux'

import Spinner from 'components/Spinner'

class ActiveLinkWithoutRouter extends Component {
  constructor (props) {
    super(props)
    this.state = {
      opening: false
    }
  }

  render ({ to, className, children, router }, { opening }) {
    return (
      <Link
          to={to}
          className={classNames(
            styles['coz-nav-link'],
            { [styles['active']]: router.isActive(to) },
            className
          )}>
        {children}
        {opening && <Spinner />}
      </Link>
    )
  }
}

const ActiveLink = withRouter(ActiveLinkWithoutRouter)

const Nav = ({ t }) => {
  return (
    <nav>
      <ul class={styles['coz-nav']}>
        <li class={styles['coz-nav-item']}>
          <ActiveLink
            to='currentBalance'
            className={styles['bnk-cat-balance']}
          >
            {t('nav.movements')}
          </ActiveLink>
        </li>
        <li class={styles['coz-nav-item']}>
          <ActiveLink
            to='movements'
            className={styles['bnk-cat-movements']}
          >
            {t('nav.movements')}
          </ActiveLink>
        </li>
        <li class={styles['coz-nav-item']}>
          <ActiveLink
            to='categories'
            className={styles['bnk-cat-categories']}
          >
            {t('nav.categorisation')}
          </ActiveLink>
        </li>
        <li class={styles['coz-nav-item']}>
          <ActiveLink
            to='projections'
            className={styles['bnk-cat-projections']}
          >
            {t('nav.projections')}
          </ActiveLink>
        </li>
        <li class={styles['coz-nav-item']}>
          <ActiveLink
            to='savings'
            className={styles['bnk-cat-savings']}
          >
             {t('nav.savings')}
          </ActiveLink>
        </li>
        <li class={styles['coz-nav-item']}>
          <ActiveLink
            to='settings'
            className={styles['bnk-cat-settings']}
          >
            {t('nav.settings')}
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
  translate()(Nav)
)
