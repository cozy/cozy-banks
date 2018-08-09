import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import { maxBy, sortBy } from 'lodash'

class LineChart extends Component {
  componentDidMount() {
    this.createChart()
  }

  componentDidUpdate() {
    this.updateData()
  }

  getRootWidth() {
    if (typeof this.props.width === 'number') {
      return this.props.width
    }

    const { width } = getComputedStyle(this.root)

    return parseInt(width)
  }

  createChart() {
    const {
      data,
      height,
      margin,
      lineWidth,
      lineColor,
      nbTicks,
      tickFormat,
      tickPadding,
      tickSizeOuter,
      tickSizeInner,
      xScale,
      yScale,
      onUpdate,
      axisMargin,
      gradient,
      showAxis,
      pointRadius,
      pointFillColor,
      pointStrokeWidth,
      pointStrokeColor
    } = this.props

    const width = this.getRootWidth()

    const innerWidth = width - margin.left - margin.right
    const innerHeight = height - margin.top - margin.bottom

    this.x = xScale().range([0, innerWidth])
    this.y = yScale().range([innerHeight, 0])

    this.svg = d3
      .select(this.root)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

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

    this.lineGenerator = d3
      .line()
      .x(d => this.x(d.x))
      .y(d => this.y(d.y))

    this.point = this.svg
      .append('circle')
      .attr('r', pointRadius)
      .attr('fill', pointFillColor)
      .attr('stroke-width', pointStrokeWidth)
      .attr('stroke', pointStrokeColor)

    this.line = this.svg
      .append('path')
      .attr('stroke', lineColor)
      .attr('stroke-width', lineWidth)
      .attr('fill', 'none')

    this.clickLine = this.svg
      .append('path')
      .attr('stroke', 'transparent')
      .attr('stroke-width', 32)
      .attr('fill', 'none')
      .on('click', this.onLineClick)

    this.xAxisGenerator = d3
      .axisBottom(this.x)
      .tickSizeOuter(tickSizeOuter)
      .tickSizeInner(tickSizeInner)
      .tickPadding(tickPadding)

    if (nbTicks !== undefined) {
      this.xAxisGenerator.ticks(nbTicks)
    }

    if (tickFormat) {
      this.xAxisGenerator.tickFormat(tickFormat)
    }

    if (showAxis) {
      this.axis = this.svg
        .append('g')
        .attr('transform', `translate(0, ${innerHeight + axisMargin})`)
    }

    this.setData(data, true)

    const lastItem = maxBy(data, d => d.x)
    this.selectItem(lastItem)

    if (onUpdate && typeof onUpdate === 'function') {
      this.props.onUpdate()
    }
  }

  setData(data, animate) {
    const sortedData = sortBy(data, d => d.x)

    this.x.domain(d3.extent(data, d => d.x))
    this.y.domain(d3.extent(data, d => d.y))

    this.line.datum(sortedData).attr('d', this.lineGenerator)
    this.clickLine.datum(sortedData).attr('d', this.lineGenerator)

    if (this.mask) {
      this.mask.datum(sortedData).attr('d', this.areaGenerator)
    }

    if (animate) {
      const totalLength = this.line.node().getTotalLength()

      this.point.attr('r', 0).attr('stroke-width', 0)

      if (this.mask) {
        this.mask.attr('opacity', 0)
      }

      this.line
        .attr('stroke-dasharray', `${totalLength} ${totalLength}`)
        .attr('stroke-dashoffset', totalLength)
        .transition()
        .duration(this.props.enterAnimationDuration)
        .ease(d3.easeExpInOut)
        .attr('stroke-dashoffset', 0)
        .on('end', () => {
          if (this.mask) {
            this.mask
              .transition()
              .duration(250)
              .ease(d3.easeLinear)
              .attr('opacity', 1)

            this.point
              .transition()
              .duration(200)
              .ease(d3.easeLinear)
              .attr('r', this.props.pointRadius)
              .attr('stroke-width', this.props.pointStrokeWidth)
          }
        })
    }

    if (this.props.showAxis) {
      this.updateAxis()
    }
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
    this.setData(this.props.data, false)
  }

  onLineClick = () => {
    const [mouseX] = d3.mouse(this.clickLine.node())
    const item = this.getNearestItem(this.x.invert(mouseX))
    // eslint-disable-next-line
    console.log(item)
  }

  getNearestItem(x) {
    const { data } = this.props

    const distances = data.map(i => Math.abs(x - i.x))
    const minDistance = Math.min(...distances)
    const nearestIndex = distances.findIndex(d => d === minDistance)

    return data[nearestIndex]
  }

  selectItem(item) {
    this.movePointTo(this.x(item.x), this.y(item.y))
  }

  movePointTo(x, y) {
    this.point.attr('cx', x).attr('cy', y)
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
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.any,
      y: PropTypes.any
    })
  ).isRequired,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
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
  gradient: PropTypes.object,
  enterAnimationDuration: PropTypes.number,
  showAxis: PropTypes.bool,
  pointRadius: PropTypes.number,
  pointFillColor: PropTypes.string,
  pointStrokeWidth: PropTypes.number,
  pointStrokeColor: PropTypes.string
}

LineChart.defaultProps = {
  margin: { top: 0, bottom: 0, left: 0, right: 0 },
  lineWidth: 2,
  lineColor: 'black',
  xScale: d3.scaleLinear,
  yScale: d3.scaleLinear,
  axisColor: 'black',
  labelsColor: 'black',
  axisMargin: 0,
  enterAnimationDuration: 1000,
  showAxis: false,
  tickPadding: 8,
  tickSizeOuter: 0,
  tickSizeInner: 5,
  pointRadius: 4,
  pointFillColor: 'black',
  pointStrokeWidth: 10,
  pointStrokeColor: 'rgba(0, 0, 0, 0.3)'
}

export default LineChart
