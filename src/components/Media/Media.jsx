import React from 'react'
import styles from './Media.styl'
import cx from 'classnames'

/**
 * Useful to align image/icon and content.
 */
export const Media = ({children, className, align, ...rest}) => {
  return (
    <div className={cx(styles.media, className, align ? styles['media--' + align] : null)} {...rest}>{
      children
    }</div>
  )
}

export const Img = ({children, className, style, ...rest}) => {
  return (
    <div className={cx(styles.img, className)} style={style} {...rest}>{
      children
    }</div>
  )
}

export const Bd = ({children, className, style}) => {
  return (
    <div className={cx(styles.bd, className)} style={style}>{
      children
    }</div>
  )
}
