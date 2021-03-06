import React from 'react'
import { useCozyTheme } from 'cozy-ui/transpiled/react/CozyTheme'

export const themed = Component => {
  const ThemedComponent = props => {
    const theme = useCozyTheme()
    return <Component {...props} theme={theme} />
  }

  return ThemedComponent
}
