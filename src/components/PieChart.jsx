/*
Component to render a pie chart from data (size from props too)
*/

import styles from '../styles/pieChart'
import React, { Component } from 'react'
import { Pie, Chart } from 'react-chartjs-2'
import pieceLabel from '../lib/chartjsPieLabels'

export class PieChart extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: {
        labels: props.labels,
        datasets: [
          {
            data: props.data,
            backgroundColor: props.colors
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        layout: { padding: 10 },
        pieceLabel: {
          mode: 'percentage',
          precision: 0
        }
      }
    }
  }

  componentWillMount () {
    Chart.pluginService.register(pieceLabel)
  }

  render () {
    const { data, options } = this.state
    return (
      <Pie
        data={data}
        className={styles['bnk-chart-pie']}
        options={options}
      />
    )
  }
}

export default PieChart
