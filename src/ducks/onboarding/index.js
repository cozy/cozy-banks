import React from 'react'
import { translate, Button } from 'cozy-ui/react'

import calculator from 'assets/icons/icon-calculator.svg'
import watch from 'assets/icons/icon-watch.svg'
import cozy from 'assets/icons/icon-cozy.svg'
import styles from './styles'
import flash from 'ducks/flash'
import Loading from 'components/Loading'
import { cozyConnect, fetchCollection } from 'redux-cozy-client'
import { ACCOUNT_DOCTYPE } from 'doctypes'
import navStyles from 'ducks/commons/Nav.styl'
import querystring from 'utils/querystring'
import applyClass from 'hoc/applyClass'

const Icon = function ({icon}) {
  return <svg className={styles.Onboarding__icon}>
    <use xlinkHref={icon} />
  </svg>
}

const _Onboarding = function ({t}) {
  return <div className={styles.Onboarding}>
    <h2>{t('Onboarding.title')}</h2>
    <div className={styles.Onboarding__sections}>
      <div className={styles.Onboarding__section}>
        <Icon icon={calculator} />
        <h3>{t('Onboarding.manage-budget.title')}</h3>
        <p>{t('Onboarding.manage-budget.description')}</p>
      </div>
      <div className={styles.Onboarding__section}>
        <Icon icon={watch} />
        <h3>{t('Onboarding.save-time.title')}</h3>
        <p>{t('Onboarding.save-time.description')}</p>
      </div>
      <div className={styles.Onboarding__section}>
        <Icon icon={cozy} />
        <h3>{t('Onboarding.cozy-assistant.title')}</h3>
        <p>{t('Onboarding.cozy-assistant.description')}</p>
      </div>
    </div>
    <p className={styles.Onboarding__connect}>
      <Button theme='regular' onClick={() => flash(t('ComingSoon.description'))}>
        {t('Onboarding.connect-bank-account')}
      </Button>
    </p>
  </div>
}

const Onboarding = applyClass(navStyles.onboarding)(translate()(_Onboarding))
export default Onboarding

/**
 * HOC to wrap Layout. Replaces its children by Onboarding
 * if we have no accounts
 */
const mapDocumentsToProps = (props) => ({
  // Must put things in another collection when there is a parent-child
  // relationships between components that fetch the same thing. Need
  // to see with goldoraf how to fetch only once so that we can use
  // the same collection "accounts" than in the settings.
  accounts: fetchCollection('onboarding_accounts', ACCOUNT_DOCTYPE)
})

const enhance = Component => cozyConnect(mapDocumentsToProps)(Component)

export const ensureHasAccounts = Component => enhance(({children, accounts, ...props}) => {
  if (accounts.fetchStatus === 'pending' ||
      accounts.fetchStatus === 'loading') {
    children = <Loading />
  } else if ((accounts.data && accounts.data.length === 0) || querystring('onboarding')) {
    children = <Onboarding />
  }
  return <Component {...props}>{children}</Component>
})
