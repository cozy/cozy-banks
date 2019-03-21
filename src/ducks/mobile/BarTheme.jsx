import React from 'react'
import PropTypes from 'prop-types'
import withSideEffect from 'react-side-effect'
import { setBarTheme } from 'ducks/mobile/utils'

class BarTheme extends React.Component {
  render() {
    return null
  }
}

BarTheme.propTypes = {
  theme: PropTypes.string.isRequired
}

function reducePropsToState(propsList) {
  const last = propsList[propsList.length - 1]
  return last ? last.theme : 'default'
}

function handleStateChangeOnClient(theme) {
  setBarTheme(theme)
}

export default withSideEffect(reducePropsToState, handleStateChangeOnClient)(
  BarTheme
)
