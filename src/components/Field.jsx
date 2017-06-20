import styles from 'styles/field'

import React from 'react'
import classNames from 'classnames'
import { translate } from 'cozy-ui/react/I18n'

const Field = ({ t, name, submitting, saved, errors, description, subtitle, children }) => (
  <div className={classNames(styles['coz-form'], styles['bnk-field'], {
    [styles['bnk-field-loading']]: submitting,
    [styles['bnk-field-saved']]: saved
  })}>
    {!!subtitle &&
      <h3
        className={styles['bnk-view-subtitle']}>
        {subtitle}
      </h3>
    }
    {!!description &&
      <label className={styles['coz-form-desc']}>
        {description}
      </label>
    }
    {children}
    {errors && errors.length !== 0 && errors.map(error => (
      <p className={styles['coz-form-errors']}>{t(error)}</p>
    ))}
  </div>
)

export default translate()(Field)
