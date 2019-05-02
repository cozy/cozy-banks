import React from 'react'
import Checkbox from 'cozy-ui/react/Checkbox'
import flag, { FlagSwitcher } from 'cozy-flags'

class DebugSettings extends React.PureComponent {
  toggleNoAccount() {
    const noAccountValue = !flag('no-account')

    flag('no-account', noAccountValue)
    if (noAccountValue) {
      flag('account-loading', false)
    }
  }

  toggleAccountsLoading() {
    const accountLoadingValue = !flag('account-loading')

    flag('account-loading', accountLoadingValue)
    if (accountLoadingValue) {
      flag('no-account', false)
    }
  }

  render() {
    const noAccountChecked = !!flag('no-account')
    const accountLoadingChecked = !!flag('account-loading')

    return (
      <div>
        <Checkbox
          defaultChecked={noAccountChecked}
          label="Display no account page"
          onClick={this.toggleNoAccount}
        />
        <Checkbox
          defaultChecked={accountLoadingChecked}
          label="Display accounts loading"
          onClick={this.toggleAccountsLoading}
        />
        <FlagSwitcher.List />
      </div>
    )
  }
}

export default DebugSettings
