import React from 'react'
import PropTypes from 'prop-types'
import styles from './Error.styl'
import { Empty, translate } from 'cozy-ui/react'
import brokenIcon from 'assets/icons/icon-broken.svg'

const Error = props => {
  const { t } = props
  const update = t('Error.update')
    .replace('#{LINK}', `<a onClick="window.location.reload(true)">`)
    .replace('#{/LINK}', '</a>')
  const lang = 'fr'
  const url = `https://cozy.io/${lang === 'fr' ? 'fr' : 'en'}/support/`
  const contact = t('Error.contact')
    .replace('#{LINK}', `<a href="${url}" target="_blank">`)
    .replace('#{/LINK}', '</a>')

  return (
    <div className={styles.Error}>
      <Empty
        className={styles.Empty}
        icon={brokenIcon}
        title={t('Error.title')}
        text={
          <div
            dangerouslySetInnerHTML={{ __html: `${update}</br>${contact}` }}
          />
        }
      />
    </div>
  )
}

Error.propTypes = {
  t: PropTypes.func.isRequired
}

export default translate()(Error)
