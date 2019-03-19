import React from 'react'
import { expireToken } from 'ducks/mobile'
import { connect } from 'react-redux'
import Alerter from 'cozy-ui/react/Alerter'
import Checkbox from 'cozy-ui/react/Checkbox'
import flag from 'cozy-flags'

class DebugSettings extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  handleMakeTokenExpired() {
    this.props.makeTokenExpired()
    Alerter.info('Token expired')
  }

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
        <button onClick={this.handleMakeTokenExpired}>
          Make token expired
        </button>
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
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    makeTokenExpired: () => dispatch(expireToken())
  }
}

export default connect(
  null,
  mapDispatchToProps
)(DebugSettings)
