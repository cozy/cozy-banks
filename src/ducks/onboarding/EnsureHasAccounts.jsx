import React, { Component } from 'react'
import { fetchCollection, getCollection } from 'cozy-client'
import { connect } from 'react-redux'
import { ACCOUNT_DOCTYPE } from 'doctypes'
import { flowRight as compose } from 'lodash'
import Loading from 'components/Loading'
import { withRouter } from 'react-router'
import Onboarding from './Onboarding'
import styles from './Onboarding.styl'
import stylesLayout from 'styles/main.styl'
import { Layout, Main, Content } from 'cozy-ui/react/Layout'
import { isCollectionLoading } from 'utils/client'

export const getAccounts = state => {
  const col = getCollection(state, 'onboarding_accounts')
  return (col && col.data) || []
}

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
  state = {
    intervalId: false
  }

  startInterval = () => {
    const { accounts, fetchAccounts } = this.props
    if (accounts.length === 0 && !this.state.intervalId) {
      const intervalId = setInterval(() => fetchAccounts(), 30000)
      this.setState({ intervalId })
    }
  }

  stopInterval = () => {
    const { intervalId } = this.state
    if (intervalId) {
      clearInterval(intervalId)
      this.setState({ intervalId: false })
    }
  }

  componentDidMount() {
    this.startInterval()
  }

  componentWillUnmount() {
    this.stopInterval()
  }

  render() {
    const { children, accounts, accountsCollection, location } = this.props

    if (isCollectionLoading(accountsCollection)) {
      return (
        <LayoutContent>
          <div className={styles.Onboarding__loading}>
            <Loading />
          </div>
        </LayoutContent>
      )
    }

    if (
      (accounts && accounts.length === 0) ||
      hasParameter(location.query, 'onboarding')
    ) {
      return (
        <LayoutContent>
          <Onboarding />
        </LayoutContent>
      )
    }

    this.stopInterval()

    return children
  }
}

const mapStateToProps = state => ({
  accounts: getAccounts(state)
})

const mapDispatchToProps = dispatch => ({
  fetchAccounts: () =>
    dispatch(fetchCollection('onboarding_accounts', ACCOUNT_DOCTYPE))
})

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps)
)(EnsureHasAccounts)
