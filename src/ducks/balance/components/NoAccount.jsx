import React, { memo } from 'react'
import Bouton from 'cozy-ui/react/Button'
import HeaderTitle from 'ducks/balance/components/HeaderTitle'
import noAccountImg from 'ducks/balance/components/NoAccount.svg'
import AddAccountLink from 'ducks/settings/AddAccountLink'

import styles from './NoAccount.styl'

const NoAccount = () => {
  return (
    <div className={styles.NoAccount}>
      <div className={styles.NoAccount_center}>
        <HeaderTitle balance={0} subtitle="Aucun compte" />
      </div>
      <div className={styles.NoAccount_chart}>
        <img src={noAccountImg} alt="" />
      </div>
      <AddAccountLink>
        <Bouton
          theme="highlight"
          icon="plus"
          size="large"
          className={styles.NoAccount_addButton}
          label="Ajouter une banque"
        />
      </AddAccountLink>
    </div>
  )
}

export default memo(NoAccount)
