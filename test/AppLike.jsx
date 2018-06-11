import React from 'react'
import { I18n } from 'cozy-ui/react'
import { Provider } from 'react-redux'
import langEn from 'locales/en.json'
import PropTypes from 'prop-types'

const AppLike = ({ children, store }) => (
  <I18n lang={'en'} dictRequire={() => langEn}>
    <Provider store={store}>{children}</Provider>
  </I18n>
)

AppLike.propTypes = {
  store: PropTypes.object.isRequired
}

export default AppLike
