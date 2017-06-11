import styles from 'styles/nav'

import React, { Component } from 'react'
import classNames from 'classnames'
import { translate } from 'cozy-ui/react/I18n'
import { Link, withRouter } from 'react-router'

import Spinner from 'components/Spinner'

const ActiveLink = withRouter(({ to, className, children, router }) => {
  return <Link
      to={to}
      className={classNames(
        styles['coz-nav-link'],
        { [styles['active']]: router.isActive(to) },
        className
      )}>
    {children}
  </Link>
})

const Nav = ({ t }) => {
  return (
    <nav>
      <ul className={styles['coz-nav']}>
        <li className={styles['coz-nav-item']}>
          <ActiveLink
            to='currentBalance'
            className={styles['bnk-cat-balance']}
          >
            {t('nav.movements')}
          </ActiveLink>
        </li>
        <li className={styles['coz-nav-item']}>
          <ActiveLink
            to='movements'
            className={styles['bnk-cat-movements']}
          >
            {t('nav.movements')}
          </ActiveLink>
        </li>
        <li className={styles['coz-nav-item']}>
          <ActiveLink
            to='categories'
            className={styles['bnk-cat-categories']}
          >
            {t('nav.categorisation')}
          </ActiveLink>
        </li>
        <li className={styles['coz-nav-item']}>
          <ActiveLink
            to='projections'
            className={styles['bnk-cat-projections']}
          >
            {t('nav.projections')}
          </ActiveLink>
        </li>
        <li className={styles['coz-nav-item']}>
          <ActiveLink
            to='savings'
            className={styles['bnk-cat-savings']}
          >
             {t('nav.savings')}
          </ActiveLink>
        </li>
        <li className={styles['coz-nav-item']}>
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

export default translate()(Nav)
