import React from 'react'
import { translate, Icon } from 'cozy-ui/react'
import { Link, withRouter } from 'react-router'
import styles from './Nav.styl'
import cx from 'classnames'

import dashboard from 'assets/icons/icon-dashboard.svg'
import arrows from 'assets/icons/icon-arrow-left-right.svg'
import graph from 'assets/icons/icon-graph.svg'
import people from 'assets/icons/icon-people.svg'

const ActiveLink = withRouter(function ActiveLink ({ to, className, children, router }) {
  return (
    <Link
      to={to}
      className={cx(
          styles['coz-nav-link'],
          { [styles['active']]: router.isActive(to) },
          className
        )}>
      {children}
    </Link>
  )
})

const Nav = ({ t }) => (
  <nav>
    <ul className={styles['coz-nav']}>
      <li className={styles['coz-nav-item']}>
        <ActiveLink to='currentBalance'>
          <Icon icon={dashboard} /> {t('Nav.balance')}
        </ActiveLink>
      </li>
      <li className={styles['coz-nav-item']}>
        <ActiveLink to='movements'>
          <Icon icon={arrows} /> {t('Nav.movements')}
        </ActiveLink>
      </li>
      <li className={styles['coz-nav-item']}>
        <ActiveLink to='categories'>
          <Icon icon={graph} /> {t('Nav.categorisation')}
        </ActiveLink>
      </li>
      <li className={styles['coz-nav-item']}>
        <ActiveLink to='settings'>
          <Icon icon={people} /> {t('Nav.settings')}
        </ActiveLink>
      </li>
    </ul>
  </nav>
)

export default translate()(Nav)
