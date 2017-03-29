import React, { Component } from 'react'
import { connect } from 'react-redux'
import { translate } from '../lib/I18n'

export class Categories extends Component {
  render () {
    return (
      <div>
        <h2>
          Categorisation
        </h2>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
})

export const mapDispatchToProps = (dispatch, ownProps) => ({
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(translate()(Categories))
