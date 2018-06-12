import React from 'react'
import { I18n } from 'cozy-ui/react'
import { Provider } from 'react-redux'
import langEn from 'locales/en.json'
import store from 'test/store'

const AppLike = ({ children, store }) => (
  <I18n lang={'en'} dictRequire={() => langEn}>
    <Provider store={store}>{children}</Provider>
  </I18n>
)

AppLike.defaultProps = {
  store
}

export default AppLike
