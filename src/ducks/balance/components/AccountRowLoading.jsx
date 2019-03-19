import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { flowRight as compose } from 'lodash'
import Spinner from 'cozy-ui/react/Spinner'
import { translate } from 'cozy-ui/react'
import KonnectorIcon from 'ducks/balance/components/KonnectorIcon'
import styles from './AccountRow.styl'
import stylesLoading from './AccountRowLoading.styl'

const AccountRowLoading = ({ t, institutionSlug }) => (
  <li className={styles.AccountRow}>
    <div className={styles.AccountRow__column}>
      <div className={styles.AccountRow__logo}>
        {institutionSlug && <KonnectorIcon slug={institutionSlug} />}
      </div>
      <div className={styles.AccountRow__labelUpdatedAtWrapper}>
        <div className={styles.AccountRow__label}>
          {t('Balance.importing_accounts')}
        </div>
        <div className={styles.AccountRow__updatedAt}>
          <Spinner size="small" className={stylesLoading.spinner} />
          <span className={stylesLoading.color}>
            {t('Balance.in_progress')}
          </span>
        </div>
      </div>
    </div>
  </li>
)

AccountRowLoading.propTypes = {
  t: PropTypes.func.isRequired,
  institutionSlug: PropTypes.string.isRequired
}

export default compose(
  translate(),
  memo
)(AccountRowLoading)
