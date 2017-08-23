import React from 'react'
import styles from 'styles/media'
import cx from 'classnames'

export const Media = ({ children, className, align, ...rest }) => {
  return <div className={cx(styles.media, className, align ? styles['media--' + align] : null)} {...rest}>{
    children
  }</div>
}

export const Img = ({ children, className }) => {
  return <div className={cx(styles.img, className)}>{
    children
  }</div>
}

export const Bd = ({ children, className }) => {
  return <div className={cx(styles.bd, className)}>{
    children
  }</div>
}
