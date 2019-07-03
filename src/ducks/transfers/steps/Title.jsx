import React from 'react'
import { Title as UITitle } from 'cozy-ui/transpiled/react'

const _Title = ({ children }) => {
  return <UITitle className="u-ta-center u-mb-1">{children}</UITitle>
}

const Title = React.memo(_Title)

export default Title
