import React, { Component } from 'react'
import SharingIcon from 'components/SharingIcon'
import styles from 'styles/tooltip'
import { connect } from 'react-redux'
import { getSharingInfo } from 'reducers'
import { fetchSharingInfo } from 'modules/SharingStatus'
import { Media, Bd, Img } from 'components/Media'

const ACCOUNT_DOCTYPE = 'io.cozy.bank.accounts'

const ownerRx = /\((.*)\)/
const getOwner = function (account) {
  if (!account) { return }
  const match = ownerRx.exec(account.label)
  return match ? match[1] : ''
}

class AccountSharingStatus extends Component {
  componentDidMount () {
    if (!this.props.sharingInfo) {
      this.props.fetchSharingInfo()
    }
  }

  render ({ account, sharingInfo, withText, tooltip }) {
    const info = (sharingInfo && sharingInfo.info) || {}

    const isShared = info.recipients && info.recipients.length > 0
    const iconProps = {}

    if (info.owner) {
      iconProps.to = true
    } else if (info.recipients && info.recipients.length) {
      iconProps.from = true
    }

    const owner = getOwner(info.account)

    const rhProps = tooltip ? {
      'data-rh-cls': styles['account-sharing-tooltip'],
      'data-rh-at': 'top',
      'data-rh': `Partagé par ${owner}`
    } : {}

    return isShared && <Media {...rhProps}>
      <Img><SharingIcon {...iconProps} /></Img>
      <Bd>{ withText && <span>Partagé par { owner }</span>}</Bd>
    </Media>
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
