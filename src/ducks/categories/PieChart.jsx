/*
Component to render a pie chart from data (size from props too)
*/

import styles from './PieChart.styl'
import React, { Component } from 'react'
import { Pie, Chart } from 'react-chartjs-2'
import pieceLabel from 'lib/chartjsPieLabels'

class PieChart extends Component {
  state = {
    data: {
      labels: this.props.labels,
      datasets: [
        {
          data: this.props.data,
          backgroundColor: this.props.colors,
          borderWidth: 0
        }
      ]
    },
    options: {
      legend: {
        display: false
      },
      responsive: false,
      maintainAspectRatio: false,
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const label = data.labels[tooltipItem.index]
            return `${label}`
          },
          afterLabel: (tooltipItem, data) => {
            const value = data.datasets[0].data[tooltipItem.index]
            return `${value} €`
          }
        },
        bodySpacing: 4,
        xPadding: 8
      },
      pieceLabel: {
        mode: 'percentage',
        fontSize: 16,
        fontFamily: '"Lato"',
        precision: 0
      }
    }
  }

  componentWillMount () {
    Chart.pluginService.register(pieceLabel)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({data: {
      labels: nextProps.labels,
      datasets: [
        {
          data: nextProps.data,
          backgroundColor: nextProps.colors,
          borderWidth: 0
        }
      ]
    }})
  }

  render ({onClick}, { data, options }) {
    return (
      <div className={styles['bnk-chart-pie']}>
        <Pie
          data={data}
          height={250}
          width={250}
          options={options}
          onElementsClick={e => { if (onClick) onClick(e[0]._index) }}
        />
      </div>
    )
  }
}

export default PieChart
