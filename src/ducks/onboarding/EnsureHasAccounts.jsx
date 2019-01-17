import React, { Component } from 'react'
import { flowRight as compose } from 'lodash'
import Loading from 'components/Loading'
import { withRouter } from 'react-router'
import Onboarding from './Onboarding'
import styles from './Onboarding.styl'
import stylesLayout from 'styles/main.styl'
import { Layout, Main, Content } from 'cozy-ui/react'
import { queryConnect } from 'cozy-client'
import { isCollectionLoading } from 'ducks/client/utils'
import { getClient } from 'ducks/client'
import { accountsConn } from 'doctypes'

const queryName = 'onboarding'

const hasParameter = (qs, param) => {
  // result of querystring parsing is created without prototype
  // thus we need to use Object.prototype.hasOwnProperty
  return Object.prototype.hasOwnProperty.call(qs, param)
}

const LayoutContent = props => (
  <Layout>
    <Main>
      <Content className={stylesLayout['c-content']}>{props.children}</Content>
    </Main>
  </Layout>
)

export function EnsureHasAccountsView(props) {
  const { children, accounts, location } = props

  if (isCollectionLoading(accounts)) {
    return (
      <LayoutContent>
        <div className={styles.Onboarding__loading}>
          <Loading />
        </div>
      </LayoutContent>
    )
  }

  if (
    (accounts && accounts.data && accounts.data.length === 0) ||
    (location && hasParameter(location.query, 'onboarding'))
  ) {
    return (
      <LayoutContent>
        <Onboarding />
      </LayoutContent>
    )
  }

  return children
}

/**
 * Replaces its children by Onboarding if we have no accounts
 */
export class EnsureHasAccounts extends Component {
  intervalId = false

  startInterval = () => {
    const { accounts } = this.props
    const shouldStartInterval =
      accounts &&
      accounts.data &&
      accounts.data.length === 0 &&
      !this.intervalId

    if (shouldStartInterval) {
      const INTERVAL_DURATION = 30000
      this.intervalId = setInterval(
        () => this.fetchAccounts(),
        INTERVAL_DURATION
      )
    }
  }

  fetchAccounts() {
    const client = getClient()
    if (!client) {
      return
    }
    client.query(accountsConn.query(client), { as: queryName })
  }

  stopInterval = () => {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = false
    }
  }

  intervalHandler = () => {
    const { accounts } = this.props
    if (!isCollectionLoading(accounts) && accounts.data.length === 0) {
      this.startInterval()
    } else {
      this.stopInterval()
    }
  }

  componentDidMount() {
    this.intervalHandler()
  }

  componentDidUpdate() {
    this.intervalHandler()
  }

  componentWillUnmount() {
    this.stopInterval()
  }

  render() {
    return (
      <EnsureHasAccountsView
        accounts={this.props.accounts}
        location={this.props.location}
      >
        {this.props.children}
      </EnsureHasAccountsView>
    )
  }
}

export default compose(
  withRouter,
  queryConnect({
    accounts: { ...accountsConn, as: queryName }
  })
)(EnsureHasAccounts)
