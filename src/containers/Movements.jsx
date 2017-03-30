import styles from '../styles/movements'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { translate } from '../lib/I18n'

import Select from '../components/Select'
import FigureBlock from '../components/FigureBlock'
import OperationsBoard from '../components/OperationsBoard'

const DATE_OPTIONS = ['Du 01 février au 24 février 2017']

const MOVEMENTS_DATA = [
  {
    name: 'Restaurant Les frères Sushi',
    type: 'restaurant',
    date: new Date(2017, 1, 22),
    amount: -32.1,
    currency: '€'
  },
  {
    name: 'Monoprix',
    type: 'cart',
    date: new Date(2017, 1, 22),
    amount: -12.83,
    currency: '€'
  },
  {
    name: 'Facture SFR',
    type: 'phone',
    date: new Date(2017, 1, 22),
    amount: -10,
    currency: '€',
    action: {
      type: 'bill',
      url: ''
    }
  },
  {
    name: 'Docteur Martin',
    type: 'health',
    date: new Date(2017, 1, 21),
    amount: -450,
    currency: '€',
    action: {
      type: 'refurbishment',
      url: ''
    }
  },
  {
    name: 'Salaire de février',
    type: 'transfer',
    date: new Date(2017, 1, 21),
    amount: 2390,
    currency: '€'
  },
  {
    name: 'Shopping le vetement c\'est la vie',
    type: 'shopping',
    date: new Date(2017, 1, 19),
    amount: -79,
    currency: '€'
  },
  {
    name: 'Mac King',
    type: 'fastfood',
    date: new Date(2017, 1, 19),
    amount: -7.9,
    currency: '€'
  },
  {
    name: 'SNCF Paris 13',
    type: 'travel',
    date: new Date(2017, 1, 19),
    amount: -25,
    currency: '€'
  },
  {
    name: 'Monoprix',
    type: 'cart',
    date: new Date(2017, 1, 17),
    amount: -12.36,
    currency: '€'
  }
]

export class Movements extends Component {
  render () {
    const movements = MOVEMENTS_DATA
    let credits = 0
    let debits = 0
    movements.forEach((movement) => {
      if (movement.amount > 0) {
        credits += movement.amount
      } else {
        debits += movement.amount
      }
    })
    return (
      <div>
        <h2>
          Mouvements
        </h2>
        <div className={styles['bnk-mov-form']}>
          <Select name='locale' options={DATE_OPTIONS} onChange={() => {}} />
        </div>
        <div className={styles['bnk-mov-figures']}>
          <FigureBlock label='Total' total={credits + debits} currency='€' coloredPositive coloredNegative signed />
          <FigureBlock label='Débit' total={debits} currency='€' signed />
          <FigureBlock label='Crédit' total={credits} currency='€' signed />
          <FigureBlock label='Opérations' total={movements.length} decimalNumbers={0} />
        </div>
        <OperationsBoard movements={movements} />
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
