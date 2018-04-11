import React from 'react'
import {
  translate,
  Nav as UINav,
  NavItem,
  NavIcon,
  NavText,
  genNavLink
} from 'cozy-ui/react'
import { Link } from 'react-router'

import dashboard from 'assets/icons/icon-dashboard.svg'
import arrows from 'assets/icons/icon-arrow-left-right.svg'
import graph from 'assets/icons/icon-graph.svg'
import people from 'assets/icons/icon-people.svg'

const NavLink = genNavLink(Link)

const Nav = ({ t }) => (
  <UINav>
    <NavItem>
      <NavLink to="balances">
        <NavIcon icon={dashboard} />
        <NavText>{t('Nav.balance')}</NavText>
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink to="transactions">
        <NavIcon icon={arrows} />
        <NavText>{t('Nav.movements')}</NavText>
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink to="categories">
        <NavIcon icon={graph} />
        <NavText>{t('Nav.categorisation')}</NavText>
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink to="settings">
        <NavIcon icon={people} />
        <NavText>{t('Nav.settings')}</NavText>
      </NavLink>
    </NavItem>
  </UINav>
)

export default translate()(Nav)
