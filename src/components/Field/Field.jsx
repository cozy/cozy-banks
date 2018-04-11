import React from 'react'
import Types from 'prop-types'
import classNames from 'classnames'
import { translate } from 'cozy-ui/react/I18n'
import styles from './Field.styl'

/**
 * Displays a form field with options for
 * - `submitting` state
 * - `saved` state
 * - `errors`
 */
const Field = ({
  t,
  submitting,
  saved,
  errors,
  description,
  subtitle,
  className,
  children
}) => (
  <div
    className={classNames(styles['coz-form'], styles['bnk-field'], className, {
      [styles['bnk-field-loading']]: submitting,
      [styles['bnk-field-saved']]: saved
    })}
  >
    {!!subtitle && <h3 className={styles['bnk-view-subtitle']}>{subtitle}</h3>}
    {!!description && (
      <label className={styles['coz-form-desc']}>{description}</label>
    )}
    {children}
    {errors &&
      errors.length !== 0 &&
      errors.map(error => (
        <p key={error} className={styles['coz-form-errors']}>
          {t(error)}
        </p>
      ))}
  </div>
)

Field.propTypes = {
  /** Name your field */
  subtitle: Types.string,
  /** Description of your field */
  description: Types.string,
  /** Shows a spinner */
  submitting: Types.bool,
  /** Shows a valid tick */
  saved: Types.bool,
  /** Shows errors */
  errors: Types.arrayOf(Types.string),
  /** Extra classname */
  className: Types.string,
  /** `<input/>`s, `<select/>`s etc... */
  children: Types.oneOfType([Types.arrayOf(Types.node), Types.node])
}

export default translate()(Field)
