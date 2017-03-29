import styles from '../styles/movements'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { translate } from '../lib/I18n'

import Select from '../components/Select'
import FigureBlock from '../components/FigureBlock'

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
        <div className={styles['bnk-mov-figures']}>
          <FigureBlock label='Total' total={1097.97} currency='€' colored signed />
          <FigureBlock label='Débit' total={-1292.03} currency='€' signed />
          <FigureBlock label='Crédit' total={2390} currency='€' signed />
          <FigureBlock label='Opérations' total={32} />
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
