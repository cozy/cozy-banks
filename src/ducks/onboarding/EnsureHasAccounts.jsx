import React from 'react'
import { cozyConnect, fetchCollection } from 'cozy-client'
import { ACCOUNT_DOCTYPE } from 'doctypes'
import { flowRight as compose } from 'lodash'
import Loading from 'components/Loading'
import { withRouter } from 'react-router'
import Onboarding from './Onboarding'
import styles from './Onboarding.styl'
import stylesLayout from 'styles/main.styl'
import { Layout, Main, Content } from 'cozy-ui/react/Layout'
import { isCollectionLoading } from 'utils/client'

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
const EnsureHasAccounts = props => {
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
    (accounts.data && accounts.data.length === 0) ||
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

const mapDocumentsToProps = () => ({
  // Must put things in another collection when there is a parent-child
  // relationships between components that fetch the same thing. Need
  // to see with goldoraf how to fetch only once so that we can use
  // the same collection "accounts" than in the settings.
  accounts: fetchCollection('onboarding_accounts', ACCOUNT_DOCTYPE)
})

export default compose(withRouter, cozyConnect(mapDocumentsToProps))(
  EnsureHasAccounts
)
