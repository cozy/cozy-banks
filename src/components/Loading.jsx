import styles from 'styles/loading'

import React from 'react'
import { translate } from 'cozy-ui/react/I18n'

export const Loading = ({ t, loadingType, noMargin }) => {
  return (
    <div
      className={noMargin
        ? styles['bnk-loading--no-margin']
        : styles['bnk-loading']
      }
    >
      {loadingType && <p>{ t("Loading.loading") }</p>}
    </div>
  )
}

export default translate()(Loading)
