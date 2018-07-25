import React, { Component } from 'react'
import { flowRight as compose } from 'lodash'
import Loading from 'components/Loading'
import { withRouter } from 'react-router'
import Onboarding from './Onboarding'
import styles from './Onboarding.styl'
import stylesLayout from 'styles/main.styl'
import { Layout, Main, Content } from 'cozy-ui/react'
import { queryConnect, isCollectionLoading, getClient } from 'utils/client'
import { accountsConn } from 'doctypes'

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

/**
 * Replaces its children by Onboarding if we have no accounts
 */
class EnsureHasAccounts extends Component {
  intervalId = false

  startInterval = () => {
    const { accounts } = this.props
    if (accounts && accounts.length === 0 && !this.intervalId) {
      this.intervalId = setInterval(() => this.fetchAccounts(), 30000)
    }
  }

  fetchAccounts = () => {
    const client = getClient()
    if (!client) {
      return
    }
    client.query(accountsConn.query).then(data => {
      console.log('fetched accounts', data)
    })
  }

  stopInterval = () => {
    if (this.intervalId) {
      clearInterval(this.intervalId)
      this.intervalId = false
    }
  }

  componentDidMount() {
    this.startInterval()
  }

  componentDidUpdate() {
    const { accounts } = this.props
    if (accounts.length === 0) {
      this.startInterval()
    } else {
      this.stopInterval()
    }
  }

  componentWillUnmount() {
    this.stopInterval()
  }

  render() {
    const { children, accounts, location } = this.props

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
      hasParameter(location.query, 'onboarding')
    ) {
      return (
        <LayoutContent>
          <Onboarding />
        </LayoutContent>
      )
    }

    return children
  }
}

export default compose(
  withRouter,
  queryConnect({
    accounts: { ...accountsConn, as: 'onboarding' }
  })
)(EnsureHasAccounts)
