import React from 'react'
import styles from './styles.styl'
import { Input } from 'cozy-ui/react'

const OptionalInput = props => {
  return <Input {...props} className={styles.OptionalInput} />
}

export default OptionalInput
