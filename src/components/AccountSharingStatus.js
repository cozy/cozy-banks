import React, { Component } from 'react'
import SharingIcon from 'components/SharingIcon'
import styles from 'styles/tooltip'
import { connect } from 'react-redux'
import { getSharingInfo } from 'reducers'
import { fetchSharingInfo } from 'modules/SharingStatus'

// TODO
const ACCOUNT_DOCTYPE = 'accounts'

class AccountSharingStatus extends Component {
  componentDidMount () {
    if (!this.props.sharingInfo) {
      this.props.fetchSharingInfo()
    }
  }

  render ({ account, sharingInfo, withText, tooltip }) {
    const info = (sharingInfo && sharingInfo.info) || {}

    const isShared = info.recipients || info.shared
    const iconProps = {}

    if (info.recipients) { iconProps['from'] = info.recipients.join(', ') }
    if (info.shared) { iconProps['to'] = 'Patrick Browne' }

    const rhProps = tooltip ? {
      'data-rh-cls': styles['account-sharing-tooltip'],
      'data-rh-at': 'top',
      'data-rh': iconProps['to'] || iconProps['from']
    } : {}

    return isShared && <span {...rhProps}>
      <SharingIcon {...iconProps} />
      { withText && <span>&nbsp;{ info.recipients && info.recipients.join(', ') }</span>}
    </span>
  }
}

const mapStateToProps = function (state, ownProps) {
  return {
    sharingInfo: getSharingInfo(state, ACCOUNT_DOCTYPE, ownProps.account._id)
  }
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    fetchSharingInfo: (doctype, id) => {
      dispatch(fetchSharingInfo(ACCOUNT_DOCTYPE, props.account._id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountSharingStatus)
