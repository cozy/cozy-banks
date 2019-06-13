import React from 'react'
import { translate } from 'cozy-ui/react'
import UINav, { NavItem, NavIcon, NavText, genNavLink } from 'cozy-ui/react/Nav'
import { Link } from 'react-router'
import flag from 'cozy-flags'

import wallet from 'assets/icons/icon-wallet.svg'
import graph from 'assets/icons/icon-graph.svg'
import transfers from 'assets/icons/icon-transfers.svg'

const NavLink = genNavLink(Link)

export const Nav = ({ t }) => (
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
    {flag('transfers') ? (
      <NavItem>
        <NavLink to="transfers">
          <NavIcon icon={transfers} />
          <NavText>{t('Transfer.nav')}</NavText>
        </NavLink>
      </NavItem>
    ) : null}
    <NavItem>
      <NavLink to="settings">
        <NavIcon icon="gear" />
        <NavText>{t('Nav.settings')}</NavText>
      </NavLink>
    </NavItem>
    {Nav.renderExtra()}
  </UINav>
)

Nav.renderExtra = () => null

export default translate()(Nav)
