import React from 'react'
import { expireToken } from 'ducks/mobile'
import { connect } from 'react-redux'
import { Alerter } from 'cozy-ui/react'

class DebugSettings extends React.PureComponent {
  constructor(props) {
    super(props)
    this.handleMakeTokenExpired = this.handleMakeTokenExpired.bind(this)
  }

  handleMakeTokenExpired() {
    this.props.makeTokenExpired()
    Alerter.info('Token expired')
  }

  render() {
    return (
      <div>
        <button onClick={this.handleMakeTokenExpired}>
          Make token expired
        </button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    makeTokenExpired: () => dispatch(expireToken())
  }
}

export default connect(
  null,
  mapDispatchToProps
)(DebugSettings)
