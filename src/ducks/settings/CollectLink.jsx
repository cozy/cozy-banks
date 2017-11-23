/* global __TARGET__ */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import IntentButton from 'components/IntentButton'
import { flowRight as compose } from 'lodash'
import { getAppUrlBySource, fetchApps } from 'ducks/apps'

/*
 * This component aims to open collect:
 * - on browser, it displays collect intent
 * - on mobile, it opens a new window with collect url
 *
 * TODO: remove this component when intents will work on mobile
 */

// Mobile

const mapDispatchToProps = dispatch => ({
  fetchApps: () => dispatch(fetchApps())
})

const mapStateToProps = state => ({
  collectUrl: getAppUrlBySource(state, 'github.com/cozy/cozy-collect')
})

const MobileLink = compose(
  connect(mapStateToProps, mapDispatchToProps)
)(class extends Component {
  componentDidMount () {
    this.props.fetchApps()
  }

  render () {
    const url = this.props.collectUrl + '#/providers/banking'
    return (
      <span onClick={() => window.open(url, '_system')}>
        {this.props.children}
      </span>
    )
  }
})

// Browser

class BrowserLink extends Component {
  render () {
    return (
      <IntentButton
        action='CREATE'
        docType='io.cozy.accounts'
        data={{dataType: 'bankAccounts'}}
      >
        {this.props.children}
      </IntentButton>
    )
  }
}

// Switch according to target

const CollectLink = (props) => {
  const Link = __TARGET__ === 'mobile' ? MobileLink : BrowserLink
  return <Link {...props} />
}

export default CollectLink
