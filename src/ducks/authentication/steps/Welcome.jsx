import React, { Component } from 'react'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { translate, Button } from 'cozy-ui/react'

import styles from '../styles'
import { getDevicePlatform } from '../lib/client'

export class Welcome extends Component {
  render() {
    const { t, selectServer } = this.props

    return (
      <div className={classNames(styles['wizard'], styles['welcome'])}>
        <div className={styles['wizard-main']}>
          <div className={styles['logo-wrapper']}>
            <div className={styles['cozy-logo-white']} />
          </div>
          <h1 className={styles['title']}>
            {t('mobile.onboarding.welcome.title1')}
          </h1>
          <h1 className={styles['title']}>
            {t('mobile.onboarding.welcome.title2')}
          </h1>
        </div>
        <footer className={styles['wizard-footer']}>
          <Button theme="regular" onClick={selectServer}>
            {t('mobile.onboarding.welcome.button')}
          </Button>
          <a
            href={`https://manager.cozycloud.cc/cozy/create?pk_campaign=banks-${getDevicePlatform()}`}
            className={styles['link']}
          >
            {t('mobile.onboarding.welcome.no_account_link')}
          </a>
        </footer>
      </div>
    )
  }
}

export default connect()(translate()(Welcome))
