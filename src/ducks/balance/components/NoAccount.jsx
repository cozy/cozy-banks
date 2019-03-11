import React, { memo } from 'react'
import { flowRight as compose } from 'lodash'
import cx from 'classnames'
import { translate, withBreakpoints } from 'cozy-ui/react'
import Bouton from 'cozy-ui/react/Button'
import HeaderTitle from 'ducks/balance/components/HeaderTitle'
import AddAccountLink from 'ducks/settings/AddAccountLink'

import styles from './NoAccount.styl'

const NoAccount = ({ lang, t, breakpoints: { isMobile } }) => {
  const timelineImg = require(`./timeline_${isMobile ? 'mobile' : 'desktop'}_${
    lang === 'fr' ? 'fr' : 'en'
  }.svg`)
  return (
    <div className={cx(styles.NoAccount, styles.VerticalContainer)}>
      <div className={styles.NoAccount_title}>
        <HeaderTitle balance={0} subtitle={t('Aucun compte')} />
      </div>
      <div className={styles.NoAccount_bottom}>
        <div className={styles.NoAccount_chart} />
        <img src={timelineImg} alt="" className={styles.NoAccount_timeline} />
      </div>
      <AddAccountLink>
        <Bouton
          theme="highlight"
          icon="plus"
          size="large"
          className={styles.NoAccount_addButton}
          label={t('Ajouter une banque')}
        />
      </AddAccountLink>
    </div>
  )
}

export default compose(
  translate(),
  withBreakpoints(),
  memo
)(NoAccount)
