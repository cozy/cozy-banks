import React from 'react'
import Icon from 'cozy-ui/transpiled/react/Icon'
import styles from './styles.styl'

const BarSearchInput = ({
  onChange,
  onClick,
  placeholder,
  value,
  autofocus
}) => {
  return (
    <div onClick={onClick} className={styles.InputWrapper}>
      <Icon icon="magnifier" />
      <input
        type="text"
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        autoFocus={autofocus}
      />
    </div>
  )
}

export default BarSearchInput
