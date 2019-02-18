import React from 'react'
import { expireToken } from 'ducks/mobile'
import { connect } from 'react-redux'

class DebugSettings extends React.PureComponent {
  constructor(props) {
    super(props)
    this.handleMakeTokenExpired = this.handleMakeTokenExpired.bind(this)
  }

  handleMakeTokenExpired() {
    this.props.makeTokenExpired()
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
