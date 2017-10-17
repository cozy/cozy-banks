import React from 'react'
import { translate, Icon } from 'cozy-ui/react'
import { Link } from 'react-router'
import styles from './Nav.styl'
import mkComponent from 'utils/mkComponent'
import dashboard from 'assets/icons/icon-dashboard.svg'
import arrows from 'assets/icons/icon-arrow-left-right.svg'
import graph from 'assets/icons/icon-graph.svg'
import people from 'assets/icons/icon-people.svg'

const ActiveLink = ({ to, children }) => (
  <Link
    to={to}
    activeClassName={styles['active']}
    className={styles['coz-nav-link']}>
    {children}
  </Link>
)

const NavList = mkComponent('ul', { className: styles['coz-nav'] })
const NavItem = mkComponent('li', { className: styles['coz-nav-item'] })

const Nav = ({ t }) => (
  <nav>
    <NavList>
      <NavItem>
        <ActiveLink to='currentBalance'>
          <Icon icon={dashboard} /> {t('Nav.balance')}
        </ActiveLink>
      </NavItem>
      <NavItem>
        <ActiveLink to='transactions'>
          <Icon icon={arrows} /> {t('Nav.movements')}
        </ActiveLink>
      </NavItem>
      <NavItem>
        <ActiveLink to='categories'>
          <Icon icon={graph} /> {t('Nav.categorisation')}
        </ActiveLink>
      </NavItem>
      <NavItem>
        <ActiveLink to='settings'>
          <Icon icon={people} /> {t('Nav.settings')}
        </ActiveLink>
      </NavItem>
    </NavList>
  </nav>
)

export default translate()(Nav)
