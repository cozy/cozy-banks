import React from 'react'
import { Card } from 'cozy-ui/react'
import styles from './styles.styl'
import cx from 'classnames'

const mergeProps = (
  { className, ...props },
  { className: otherClassName, ...otherProps }
) => ({
  ...props,
  ...otherProps,
  className: cx(className, otherClassName)
})

const SettingCard = ({ dashed, clickable, ...props }) => {
  return (
    <Card
      {...mergeProps(props, {
        className: cx(
          styles.SettingCard,
          dashed && styles['SettingCard--dashed'],
          clickable && styles['SettingCard--clickable']
        )
      })}
    />
  )
}

export default SettingCard
