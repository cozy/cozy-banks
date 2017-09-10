import React from 'react'
import styles from './styles.styl'
import classNames from 'classnames'

/**
 * Used to display tabular data.
 * Column widths MUST be explicitly set with `flex-basis`.
 */
const Table = ({children, className}) => (
  <table className={classNames(styles['coz-table'], className)}>
    {children}
  </table>
)

const TdWithIcon = ({children, className, onClick}) => (
  <td className={classNames(styles['coz-table-td-with-icon'], className)} onClick={onClick}>
    {children}
  </td>
)

export { Table, TdWithIcon }

export default Table
