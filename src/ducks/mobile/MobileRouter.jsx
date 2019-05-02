import React from 'react'
import { withClient } from 'cozy-client'
import appIcon from 'targets/favicons/icon-banks.jpg'
import { MobileRouter as AuthMobileRouter } from 'cozy-authentication'
import { hashHistory } from 'react-router'
import { protocol, appTitle } from 'ducks/mobile/constants'

// TODO integrate ability to display a component while logging out to cozy-authentication
// import LogoutModal from 'components/LogoutModal'

export class MobileRouter extends React.Component {

  onLogout = async () => {
    this.setState({ isLoggingOut: true }, async () => {
      this.setState({ isLoggingOut: false })
    })
  }

  render() {
    const { routes } = this.props
    return (
      <AuthMobileRouter
        protocol={protocol}
        history={hashHistory}
        appIcon={appIcon}
        appTitle={appTitle}
        loginPath="/balances"
        onLogout={this.onLogout}
      >
        {routes}
      </AuthMobileRouter>
    )
  }
}

export default withClient(MobileRouter)
