import styles from '../styles/movements'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { translate } from '../lib/I18n'

import Select from '../components/Select'

const DATE_OPTIONS = ['Du 01 février au 24 février 2017']

export class Movements extends Component {
  render () {
    return (
      <div>
        <h2>
          Mouvements
        </h2>
        <div className={styles['bnk-mov-form']}>
          <Select name='locale' options={DATE_OPTIONS} onChange={() => {}} />
        </div>
        <h3>
          Opérations
        </h3>
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
)(translate()(Movements))
