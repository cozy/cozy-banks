import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'

class LineChart extends Component {
  componentDidMount() {
    this.createChart()
  }

  componentDidUpdate() {
    this.updateData()
  }

  createChart() {
    const {
      data,
      width,
      height,
      margin,
      lineWidth,
      lineColor,
      nbTicks,
      tickFormat,
      tickPadding,
      xScale,
      yScale,
      onUpdate,
      axisMargin,
      gradient
    } = this.props

    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    this.x = xScale().range([0, innerWidth])
    this.y = yScale().range([innerHeight, 0])

    this.svg = d3
      .select(this.root)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    this.lineGenerator = d3
      .line()
      .x(d => this.x(d.x))
      .y(d => this.y(d.y))

    this.line = this.svg
      .append('path')
      .attr('stroke', lineColor)
      .attr('stroke-width', lineWidth)
      .attr('fill', 'none')

    this.xAxisGenerator = d3.axisBottom(this.x)

    if (nbTicks !== undefined) {
      this.xAxisGenerator.ticks(nbTicks)
    }

    if (tickPadding !== undefined) {
      this.xAxisGenerator.tickPadding(tickPadding)
    }

    if (tickFormat) {
      this.xAxisGenerator.tickFormat(tickFormat)
    }

    this.axis = this.svg
      .append('g')
      .attr('transform', `translate(0, ${innerHeight + axisMargin})`)

    if (gradient) {
      this.areaGenerator = d3
        .area()
        .x(d => this.x(d.x))
        .y0(() => this.y(0))
        .y1(d => this.y(d.y))

      this.mask = this.svg
        .append('mask')
        .attr('id', 'maskurl')
        .append('path')
        .attr('fill', 'white')

      this.svg
        .append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', innerWidth)
        .attr('height', innerHeight)
        .attr('mask', 'url(#maskurl)')
        .attr('fill', 'url(#gradient)')
    }

    this.setData(data)

    if (onUpdate && typeof onUpdate === 'function') {
      this.props.onUpdate()
    }
  }

  setData(data) {
    this.x.domain([d3.min(data, d => d.x), d3.max(data, d => d.x)])
    this.y.domain([d3.min(data, d => d.y), d3.max(data, d => d.y)])

    this.line.datum(data).attr('d', this.lineGenerator)

    if (this.mask) {
      this.mask.datum(data).attr('d', this.areaGenerator)
    }

    this.updateAxis()
  }

  updateAxis() {
    const { axisColor, labelsColor } = this.props

    this.axis.call(this.xAxisGenerator)
    this.axis.selectAll('.domain').attr('stroke', axisColor)
    this.axis.selectAll('.tick line').attr('stroke', axisColor)
    this.axis
      .selectAll('.tick text')
      .attr('fill', labelsColor)
      .attr('font-family', 'Lato, sans-serif')
      .attr('font-size', '0.75rem')
      .attr('style', 'text-transform: uppercase')
  }

  updateData() {
    this.setData(this.props.data)
  }

  render() {
    const { width, height, gradient } = this.props

    return (
      <svg ref={node => (this.root = node)} width={width} height={height}>
        {gradient && (
          <defs>
            <linearGradient id="gradient" x2="0%" y2="100%">
              {Object.entries(gradient).map(([offset, color]) => (
                <stop key={offset} offset={offset} stopColor={color} />
              ))}
            </linearGradient>
          </defs>
        )}
      </svg>
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
  onUpdate: PropTypes.func,
  axisMargin: PropTypes.number,
  gradient: PropTypes.object
}

LineChart.defaultProps = {
  margin: { top: 0, bottom: 0, left: 0, right: 0 },
  lineWidth: 2,
  lineColor: 'black',
  xScale: d3.scaleLinear,
  yScale: d3.scaleLinear,
  axisColor: 'black',
  labelsColor: 'black',
  axisMargin: 0
}

export default LineChart
