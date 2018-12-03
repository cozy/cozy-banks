import React, { Component } from 'react'
import * as d3 from 'd3'
import { withBreakpoints } from 'cozy-ui/react'
import LineChart from 'components/Chart/LineChart'
import styles from './History.styl'
import palette from 'cozy-ui/react/palette'
import { format as formatDate } from 'date-fns'

const gradientStyle = {
  '0%': '#76b9f3',
  '100%': palette.dodgerBlue
}

class HistoryChart extends Component {
  getTooltipContent = item => {
    const date = formatDate(item.x, 'DD  MMM')
    const balance = item.y.toFixed(2)

    return (
      <div>
        {date}
        <strong className={styles.HistoryChart__tooltipBalance}>
          {balance}€
        </strong>
      </div>
    )
  }

  render() {
    const { data, height, width } = this.props
    return (
      <div
        className={styles.HistoryChart}
        ref={node => (this.container = node)}
      >
        <LineChart
          xScale={d3.scaleTime}
          lineColor="white"
          axisColor="white"
          labelsColor="#a2c4f9"
          onUpdate={() => {
            // FIXME the ref is undefined on first render
            // this.container.scrollTo(this.container.scrollWidth, 0)
          }}
          gradient={gradientStyle}
          pointFillColor="white"
          pointStrokeColor="rgba(255, 255, 255, 0.3)"
          getTooltipContent={this.getTooltipContent}
          data={data}
          width={width}
          height={height}
          {...this.props}
        />
      </div>
    )
  }
}

export default withBreakpoints()(HistoryChart)
