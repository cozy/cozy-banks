import React from 'react'
import PropTypes from 'prop-types'
import styles from './AppVersion.styl'

const AppVersion = ({ version }) => (
  <div className={styles['app-version']}>Version {version}</div>
)

AppVersion.propTypes = {
  version: PropTypes.string.isRequired
}

export default AppVersion
