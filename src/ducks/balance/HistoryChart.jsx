import React, { Component, Fragment } from 'react'
import * as d3 from 'd3'
import { withBreakpoints } from 'cozy-ui/react'
import LineChart from 'components/Chart/LineChart'
import styles from './History.styl'
import palette from 'cozy-ui/react/palette'
import { format as formatDate } from 'date-fns'

// on iOS white transparency on SVG failed so we should calculate hexa color
const gradientStyle = {
  '0%': '#76b9f3', // TODO: replace with lighten(dodgerBlue, 48)
  '100%': palette.dodgerBlue // TODO: replace with lighten(dodgerBlue, 0)
}

class HistoryChart extends Component {
  container = React.createRef()

  getTooltipContent = item => {
    const date = formatDate(item.x, 'DD  MMM')
    const balance = item.y.toLocaleString('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })

    return (
      <Fragment>
        {date}
        <strong className={styles.HistoryChart__tooltipBalance}>
          {balance} €
        </strong>
      </Fragment>
    )
  }

  componentDidMount() {
    const container = this.container.current
    container.scrollTo(container.scrollWidth, 0)
  }

  render() {
    const { data, height, width } = this.props
    return (
      <div className={styles.HistoryChart} ref={this.container}>
        <LineChart
          xScale={d3.scaleTime}
          lineColor="white"
          axisColor="white"
          labelsColor="rgba(255, 255, 255, 0.64)"
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
