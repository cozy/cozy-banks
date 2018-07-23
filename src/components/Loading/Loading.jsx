import React from 'react'
import { translate } from 'cozy-ui/react'
import styles from './Loading.styl'

/**
 * Use it for the loading of page/section
 */
export const Loading = ({ t, loadingType, noMargin }) => {
  return (
    <div
      className={
        noMargin ? styles['bnk-loading--no-margin'] : styles['bnk-loading']
      }
    >
      {loadingType && <p>{t('Loading.loading')}</p>}
    </div>
  )
}

export default translate()(Loading)
