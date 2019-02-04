import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import { maxBy, minBy } from 'lodash'
import styles from './LineChart.styl'
import Tooltip from './Tooltip'

class LineChart extends Component {
  constructor(props) {
    super(props)

    this.createScales()
    this.updateDomains()

    this.dragging = false
    this.state = {
      x: this.x(maxBy(this.props.data, d => d.x).x)
    }
  }

  componentDidMount() {
    this.createScales()
    this.createLineGenerator()
    this.createElements()

    this.updateData()
    this.enterAnimation()
  }

  componentDidUpdate() {
    this.updateData()
  }

  /**
   * Creates the x and y scales used to transform values to pixels
   */
  createScales() {
    const { xScale, yScale } = this.props

    this.x = xScale().range([0, this.getInnerWidth()])
    this.y = yScale().range([this.getInnerHeight(), 0])
  }

  /**
   * Creates the function that will be used to draw the line
   */
  createLineGenerator() {
    this.lineGenerator = d3
      .line()
      .x(d => this.x(d.x))
      .y(d => this.y(d.y))
  }

  /**
   * Returns the width in which the chart will be drawn
   */
  getInnerWidth() {
    const { width, margin } = this.props
    return width - margin.left - margin.right
  }

  /**
   * Returns the height in which the chart will be drawn
   */
  getInnerHeight() {
    const { height, margin } = this.props
    return height - margin.top - margin.bottom
  }

  /**
   * Creates the element that will contains all others.
   * It is used to apply a translation on the whole chart content according to the margins we want to apply to it
   */
  createRoot() {
    const { margin } = this.props

    this.svg = d3
      .select(this.root)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)
  }

  /**
   * Create the gradient element
   */
  createGradient() {
    const { gradient } = this.props

    if (!gradient) {
      return
    }

    const minY = this.getDataMin()
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
      .attr('width', this.getInnerWidth())
      .attr('height', this.getInnerHeight())
      .attr('mask', 'url(#maskurl)')
      .attr('fill', 'url(#gradient)')
  }

  /**
   * Generate the vertical line that follows the point
   */
  createPointLine() {
    this.pointLine = this.svg
      .append('line')
      .attr('stroke-width', 1)
      .attr('stroke', 'white')
      .attr('stroke-dasharray', '3,2')
  }

  /**
   * Generate the data line
   */
  createLine() {
    const { lineColor, lineWidth } = this.props

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
  }

  /**
   * Generate the selected point
   */
  createPoint() {
    const {
      pointRadius,
      pointFillColor,
      pointStrokeColor,
      pointStrokeWidth
    } = this.props

    const drag = d3.drag()

    this.point = this.svg
      .append('circle')
      .attr('r', pointRadius)
      .attr('fill', pointFillColor)
      .attr('stroke-width', pointStrokeWidth)
      .attr('stroke', pointStrokeColor)
      .call(drag.on('start', this.startPointDrag))
      .call(drag.on('drag', this.pointDrag))
      .call(drag.on('end', this.stopPointDrag))
  }

  /**
   * Generate the horizontal axis
   */
  createAxis() {
    const {
      tickSizeOuter,
      tickSizeInner,
      tickPadding,
      nbTicks,
      tickFormat,
      showAxis,
      axisMargin
    } = this.props

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
        .attr(
          'transform',
          `translate(0, ${this.getInnerHeight() + axisMargin})`
        )
    }
  }

  updateAxis() {
    const { axisColor, labelsColor, showAxis } = this.props

    if (showAxis) {
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
  }

  /**
   * Create all graph elements
   */
  createElements() {
    this.createRoot()
    this.createGradient()
    this.createPointLine()
    this.createLine()
    this.createPoint()
    this.createAxis()
  }

  /**
   * Update the scales domains
   */
  updateDomains() {
    const { data } = this.props

    this.x.domain(d3.extent(data, d => d.x))

    let yDomain = d3.extent(data, d => d.y)

    // If min === max, the line will be drawn on the bottom, like
    // all values are the min. We want to opposite, so we set the
    // min to 0. This way the line will be drawn on the top
    if (yDomain[0] === yDomain[1]) {
      yDomain[0] = 0
    }

    this.y.domain(yDomain)
  }

  updateScales() {
    this.x.range([0, this.getInnerWidth()])
    this.y.range([this.getInnerHeight(), 0])
    this.updateDomains()
  }

  /**
   * Get the minimum y value in data
   */
  getDataMin() {
    return minBy(this.props.data, d => d.y)
  }

  updateGradient() {
    const minY = this.getDataMin()
    this.areaGenerator.y0(() => this.y(minY.y))
  }

  updateData() {
    const { data } = this.props

    this.updateScales()
    this.updateGradient()
    this.updateAxis()

    this.line.datum(data).attr('d', this.lineGenerator)
    this.clickLine.datum(data).attr('d', this.lineGenerator)

    if (this.mask) {
      this.mask.datum(data).attr('d', this.areaGenerator)
    }

    this.movePointTo(this.getItemAt(this.state.x))
  }

  enterAnimation() {
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

  onLineClick = () => {
    const [mouseX] = d3.mouse(this.clickLine.node())
    this.setState({ x: mouseX })
  }

  getItemAt(x) {
    const { data } = this.props

    const distances = data.map(i => Math.abs(this.x.invert(x) - i.x))
    const minDistance = Math.min(...distances)
    const nearestIndex = distances.findIndex(d => d === minDistance)

    return data[nearestIndex]
  }

  movePointTo(item) {
    if (!this.point) {
      return
    }

    const { height, margin, tickPadding } = this.props
    const x = this.x(item.x)
    const y = this.y(item.y)

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
    this.setState({ x: Math.min(mouseX, this.getInnerWidth()) })
  }

  stopPointDrag = () => {
    this.dragging = false
  }

  render() {
    const { width, height, gradient, margin, getTooltipContent } = this.props
    const { x } = this.state

    const selectedItem = this.getItemAt(x)
    this.movePointTo(selectedItem)

    const isLeftPosition = x < width / 2
    const position = isLeftPosition ? 'left' : 'right'
    const tooltipX = (isLeftPosition ? 0 : -width) + x + margin.left

    return (
      <div className={styles.LineChart}>
        {selectedItem &&
          getTooltipContent && (
            <Tooltip x={tooltipX} position={position}>
              {getTooltipContent(selectedItem)}
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
