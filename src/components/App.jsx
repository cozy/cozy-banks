import styles from '../styles/app'

import React from 'react'
import { translate } from '../lib/I18n'
import classNames from 'classnames'

const App = ({ t }) => (
  <h1 className={classNames(styles['title'])}>{ t('App.welcome') }</h1>
)

export default translate()(App)
