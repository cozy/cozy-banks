import React from 'react'
import { translate, Nav as UINav, NavLink as UINavLink, NavItem, NavIcon, NavText } from 'cozy-ui/react'
import { Link } from 'react-router'

import dashboard from 'assets/icons/icon-dashboard.svg'
import arrows from 'assets/icons/icon-arrow-left-right.svg'
import graph from 'assets/icons/icon-graph.svg'
import people from 'assets/icons/icon-people.svg'

const NavLink = ({ to, children }) => (
  <Link
    to={to}
    activeClassName={UINavLink.activeClassName}
    className={UINavLink.className}>
    {children}
  </Link>
)

// Passed as the `to` property of the Link to transactions
// so that the matching works correctly
const rxTransactions = /^\/transactions.*/
const currentTransactions = location => {
  if (rxTransactions.exec(location.pathname)) {
    return location.pathname
  } else {
    return '/transactions'
  }
}

const Nav = ({ t }) => (
  <UINav>
    <NavItem>
      <NavLink to='balances'>
        <NavIcon icon={dashboard} />
        <NavText>{t('Nav.balance')}</NavText>
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink to={currentTransactions}>
        <NavIcon icon={arrows} />
        <NavText>{t('Nav.movements')}</NavText>
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink to='categories'>
        <NavIcon icon={graph} />
        <NavText>{t('Nav.categorisation')}</NavText>
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink to='settings'>
        <NavIcon icon={people} />
        <NavText>{t('Nav.settings')}</NavText>
      </NavLink>
    </NavItem>
  </UINav>
)

export default translate()(Nav)
