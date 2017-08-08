import React from 'react'
import styles from './styles.styl'
import classNames from 'classnames'

const Table = ({children, className}) => (
  <table className={classNames(className, styles['coz-table'])}>
    {children}
  </table>
)

export default Table
