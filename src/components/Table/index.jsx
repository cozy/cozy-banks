import React from 'react'
import styles from './styles.styl'
import cx from 'classnames'

/**
 * Used to display tabular data.
 * Column widths MUST be explicitly set with `flex-basis` AND `max-width`.
 *
 * https://github.com/philipwalton/flexbugs/issues/3
 */
export const Table = ({ children, className, color, ...rest }) => (
  <table className={cx(styles['c-table'], styles[color], className)} {...rest}>
    {children}
  </table>
)

export const TdSecondary = ({ children, className, ...rest }) => (
  <td className={cx(styles['c-table-td-secondary'], className)} {...rest}>
    {children}
  </td>
)

export const TdWithIcon = ({ children, className, ...rest }) => (
  <td className={cx(styles['c-table-td-with-icon'], className)} {...rest}>
    {children}
  </td>
)

export default Table
