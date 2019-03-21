import React from 'react'
import { translate } from 'cozy-ui/react'
import UINav, { NavItem, NavIcon, NavText, genNavLink } from 'cozy-ui/react/Nav'
import { Link } from 'react-router'

import wallet from 'assets/icons/icon-wallet.svg'
import graph from 'assets/icons/icon-graph.svg'

const NavLink = genNavLink(Link)

const Nav = ({ t }) => (
  <UINav>
    <NavItem>
      <NavLink to="balances">
        <NavIcon icon={wallet} />
        <NavText>{t('Nav.my-accounts')}</NavText>
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
        <NavIcon icon="gear" />
        <NavText>{t('Nav.settings')}</NavText>
      </NavLink>
    </NavItem>
  </UINav>
)

export default translate()(Nav)
