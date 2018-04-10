import React from 'react'
import { cozyConnect, fetchCollection } from 'cozy-client'
import { ACCOUNT_DOCTYPE } from 'doctypes'
import Loading from 'components/Loading'
import { withRouter } from 'react-router'
import Onboarding from './Onboarding'
import styles from './Onboarding.styl'
import { Content, Layout } from 'components/Layout'

/**
 * HOC to wrap Layout. Replaces its children by Onboarding
 * if we have no accounts
 */
const mapDocumentsToProps = props => ({
  // Must put things in another collection when there is a parent-child
  // relationships between components that fetch the same thing. Need
  // to see with goldoraf how to fetch only once so that we can use
  // the same collection "accounts" than in the settings.
  accounts: fetchCollection('onboarding_accounts', ACCOUNT_DOCTYPE)
})

const hasParameter = (qs, param) => {
  // result of querystring parsing is created without prototype
  // thus we need to use Object.prototype.hasOwnProperty
  return Object.prototype.hasOwnProperty.call(qs, param)
}

const enhance = Component =>
  withRouter(cozyConnect(mapDocumentsToProps)(Component))

export default enhance(({ children, accounts, location }) => {
  const { fetchStatus } = accounts
  if (fetchStatus === 'pending' || fetchStatus === 'loading') {
    return (
      <Layout>
        <Content>
          <div className={styles.Onboarding__loading}>
            <Loading />
          </div>
        </Content>
      </Layout>
    )
  } else if (
    (accounts.data && accounts.data.length === 0) ||
    hasParameter(location.query, 'onboarding')
  ) {
    return (
      <Layout>
        <Content>
          <Onboarding />
        </Content>
      </Layout>
    )
  }
  return children
})
