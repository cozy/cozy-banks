import React from 'react'
import { expireToken } from 'ducks/mobile'
import { connect } from 'react-redux'

class DebugSettings extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
  }
}

const mapDispatchToProps = dispatch => {
}

export default connect(
  null,
  mapDispatchToProps
)(DebugSettings)
