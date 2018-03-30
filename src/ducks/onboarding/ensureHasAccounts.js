import React from 'react'
import {withRouter} from 'react-router'
import compose from 'lodash/flowRight'

import Loading from 'components/Loading'
import { Content, Layout } from 'components/Layout'

import { queryConnect } from 'utils/client-compat'
import { ACCOUNT_DOCTYPE } from 'doctypes'
import Onboarding from './Onboarding'
import styles from './Onboarding.styl'

/**
 * HOC to wrap Layout. Replaces its children by Onboarding
 * if we have no accounts
 */
const hasParameter = (qs, param) => {
  // result of querystring parsing is created without prototype
  // thus we need to use Object.prototype.hasOwnProperty
  return Object.prototype.hasOwnProperty.call(qs, param)
}

const enhance = Component => compose(
  withRouter,
  queryConnect({
    accounts: { query: client => client.all(ACCOUNT_DOCTYPE), as: 'onboarding_accounts' }
  })
)(Component)

export default enhance(({children, accounts, location}) => {
  const { fetchStatus } = accounts
  console.log('accounts', accounts)
  if (fetchStatus === 'pending' || fetchStatus === 'loading') {
    console.log('yoooo 1')
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
    console.log('yoooo 2')
    return <Layout><Content><Onboarding /></Content></Layout>
  }
  console.log('yoooo 3')

  return children
})
