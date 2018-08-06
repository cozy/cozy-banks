import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'

class LineChart extends Component {
  componentDidMount() {
    this.createChart()
  }

  componentDidUpdate() {
    this.createChart()
  }

  empty() {
    this.root.innerHTML = ''
  }

  createChart() {
    this.empty()

    const {
      data,
      width,
      height,
      margin,
      lineWidth,
      lineColor,
      nbTicks = data.length,
      tickFormat,
      tickPadding,
      xScale,
      yScale,
      axisColor,
      labelsColor,
      onUpdate
    } = this.props

    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    const x = xScale().range([0, innerWidth])
    const y = yScale().range([innerHeight, 0])

    x.domain([d3.min(data, d => d.x), d3.max(data, d => d.x)])
    y.domain([d3.min(data, d => d.y), d3.max(data, d => d.y)])

    const svg = d3
      .select(this.root)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    const line = d3
      .line()
      .x(d => x(d.x))
      .y(d => y(d.y))

    svg
      .append('path')
      .datum(data)
      .attr('stroke', lineColor)
      .attr('stroke-width', lineWidth)
      .attr('fill', 'none')
      .attr('d', line)

    const xAxisGenerator = d3.axisBottom(x).ticks(nbTicks)

    if (tickPadding !== undefined) {
      xAxisGenerator.tickPadding(tickPadding)
    }

    if (tickFormat) {
      xAxisGenerator.tickFormat(tickFormat)
    }

    const axis = svg
      .append('g')
      .attr('transform', `translate(0, ${innerHeight})`)
      .call(xAxisGenerator)

    axis.selectAll('.domain').attr('stroke', axisColor)
    axis.selectAll('.tick line').attr('stroke', axisColor)
    axis
      .selectAll('.tick text')
      .attr('fill', labelsColor)
      .attr('font-family', 'Lato, sans-serif')
      .attr('font-size', '0.75rem')
      .attr('style', 'text-transform: uppercase')

    if (onUpdate && typeof onUpdate === 'function') {
      this.props.onUpdate()
    }
  }

  render() {
    const { width, height } = this.props

    return (
      <svg ref={node => (this.root = node)} width={width} height={height} />
    )
  }
}

LineChart.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  margin: PropTypes.shape({
    top: PropTypes.number,
    bottom: PropTypes.number,
    left: PropTypes.number,
    right: PropTypes.number
  }),
  lineWidth: PropTypes.number,
  lineColor: PropTypes.string,
  nbTicks: PropTypes.number,
  tickFormat: PropTypes.func,
  tickPadding: PropTypes.number,
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  axisColor: PropTypes.string,
  onUpdate: PropTypes.func
}

LineChart.defaultProps = {
  margin: { top: 0, bottom: 0, left: 0, right: 0 },
  lineWidth: 2,
  lineColor: 'black',
  xScale: d3.scaleLinear,
  yScale: d3.scaleLinear,
  axisColor: 'black',
  labelsColor: 'black'
}

export default LineChart
