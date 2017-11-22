/* global __TARGET__ */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import IntentButton from 'components/IntentButton'
import { flowRight as compose } from 'lodash'
import { getAppUrlBySource, findApps } from 'ducks/apps'

// Mobile

const mapDispatchToProps = dispatch => ({
  fetchApps: () => dispatch(findApps())
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

class CollectLink extends Component {
  render () {
    const Link = __TARGET__ === 'mobile' ? MobileLink : BrowserLink
    return <Link {...this.props} />
  }
}

export default CollectLink
