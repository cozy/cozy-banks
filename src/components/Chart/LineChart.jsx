import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import { maxBy, sortBy, minBy } from 'lodash'
import styles from './LineChart.styl'
import Tooltip from './Tooltip'

class LineChart extends Component {
  dragging = false

  state = {
    selectedItem: null,
    x: null
  }

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

    const drag = d3.drag()

    this.svg = d3
      .select(this.root)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)

    if (gradient) {
      const minY = minBy(data, e => e.y)
      this.areaGenerator = d3
        .area()
        .x(d => this.x(d.x))
        .y0(() => this.y(minY.y))
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

    this.pointLine = this.svg
      .append('line')
      .attr('stroke-width', 1)
      .attr('stroke', 'white')
      .attr('stroke-dasharray', '3,2')

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

    this.point = this.svg
      .append('circle')
      .attr('r', pointRadius)
      .attr('fill', pointFillColor)
      .attr('stroke-width', pointStrokeWidth)
      .attr('stroke', pointStrokeColor)
      .call(drag.on('start', this.startPointDrag))
      .call(drag.on('drag', this.pointDrag))
      .call(drag.on('end', this.stopPointDrag))

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
  }

  setData(data, animate) {
    const sortedData = sortBy(data, d => d.x)

    this.x.domain(d3.extent(data, d => d.x))

    let yDomain = d3.extent(data, d => d.y)

    // If min === max, the line will be drawn on the bottom, like
    // all values are the min. We want to opposite, so we set the
    // min to 0. This way the line will be drawn on the top
    if (yDomain[0] === yDomain[1]) {
      yDomain[0] = 0
    }

    this.y.domain(yDomain)

    this.line.datum(sortedData).attr('d', this.lineGenerator)
    this.clickLine.datum(sortedData).attr('d', this.lineGenerator)

    if (this.mask) {
      this.mask.datum(sortedData).attr('d', this.areaGenerator)
    }

    if (animate) {
      const lineTotalLength = this.line.node().getTotalLength()

      this.point.attr('r', 0).attr('stroke-width', 0)
      this.pointLine.attr('opacity', 0)

      if (this.mask) {
        this.mask.attr('opacity', 0)
      }

      this.line
        .attr('stroke-dasharray', `${lineTotalLength} ${lineTotalLength}`)
        .attr('stroke-dashoffset', lineTotalLength)
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

            this.pointLine
              .transition()
              .duration(400)
              .ease(d3.easeExpIn)
              .attr('opacity', 1)
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

    this.selectItem(item)
  }

  getNearestItem(x) {
    const { data } = this.props

    const distances = data.map(i => Math.abs(x - i.x))
    const minDistance = Math.min(...distances)
    const nearestIndex = distances.findIndex(d => d === minDistance)

    return data[nearestIndex]
  }

  selectItem(item) {
    const x = this.x(item.x)
    const y = this.y(item.y)

    this.setState({
      selectedItem: item,
      x
    })

    this.movePointTo(x, y)
  }

  movePointTo(x, y) {
    const { height, margin, tickPadding } = this.props
    this.point.attr('cx', x).attr('cy', y)
    this.pointLine
      .attr('x1', x)
      .attr('y1', 0)
      .attr('x2', x)
      .attr('y2', height - margin.top - margin.bottom + tickPadding)
  }

  startPointDrag = () => {
    this.dragging = true
  }

  pointDrag = () => {
    if (!this.dragging) {
      return
    }

    const [mouseX] = d3.mouse(this.svg.node())
    const item = this.getNearestItem(this.x.invert(mouseX))

    this.selectItem(item)
  }

  stopPointDrag = () => {
    this.dragging = false
  }

  getTooltipContent = () => {
    const { selectedItem } = this.state
    const { getTooltipContent } = this.props

    if (getTooltipContent && selectedItem) {
      return getTooltipContent(selectedItem)
    }

    if (selectedItem) {
      return <div>{selectedItem.y}</div>
    }

    return null
  }

  render() {
    const { width, height, gradient, margin } = this.props
    const { selectedItem, x } = this.state

    const isLeftPosition = x < width / 2
    const position = isLeftPosition ? 'left' : 'right'
    const tooltipX = (isLeftPosition ? 0 : -width) + x + margin.left

    return (
      <div className={styles.LineChart}>
        {selectedItem && (
          <Tooltip x={tooltipX} position={position}>
            {this.getTooltipContent()}
          </Tooltip>
        )}
        <svg
          ref={node => (this.root = node)}
          width={width}
          height={height}
          className={styles.LineChartSVG}
        >
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
      </div>
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
  axisMargin: PropTypes.number,
  gradient: PropTypes.object,
  enterAnimationDuration: PropTypes.number,
  showAxis: PropTypes.bool,
  pointRadius: PropTypes.number,
  pointFillColor: PropTypes.string,
  pointStrokeWidth: PropTypes.number,
  pointStrokeColor: PropTypes.string,
  getTooltipContent: PropTypes.func
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
