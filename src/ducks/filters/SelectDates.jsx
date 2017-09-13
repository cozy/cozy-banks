import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'components/Select'
import { subMonths, startOfMonth, endOfMonth, differenceInDays, endOfDay } from 'date-fns'
import { translate } from 'cozy-ui/react/I18n'
import { getStartDate, getEndDate, addFilterByDates } from '.'

import styles from './SelectDates.styl'
import Icon from 'cozy-ui/react/Icon'
import arrowLeft from 'assets/icons/icon-arrow-left.svg'
import cx from 'classnames'
import { throttle } from 'lodash'

const createRange = (startDate, endDate) => ({ startDate, endDate })

const getDatesRange = () => {
  const datesRange = []
  const now = endOfDay(new Date())

  for (const monthNumber of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]) {
    const month = subMonths(now, monthNumber)
    datesRange.push(createRange(startOfMonth(month), endOfMonth(month)))
  }

  // last year
  datesRange.push(createRange(subMonths(now, 12), now))

  return datesRange
}

const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const getMain = function () {
  return document.querySelector('main')
}

class SelectDates extends Component {
  state = { scrolling: false }

  componentDidMount () {
    const main = getMain()
    main.addEventListener('scroll', this.onParentScroll)
  }

  componentWillUnmount () {
    const main = getMain()
    main.removeEventListener(main, 'scroll', this.onParentScroll)
  }

  onParentScroll = throttle(ev => {
    const scrollTop = ev.target.scrollTop
    if (scrollTop > 0 && !this.state.scrolling) {
      this.setState({ scrolling: true })
    } else if (scrollTop === 0 && this.state.scrolling) {
      this.setState({ scrolling: false })
    }
  }, 16)

  state = {
    datesRange: getDatesRange()
  }

  getSelectedIndex = () => {
    const { datesRange } = this.state
    const { startDate, endDate } = this.props
    for (const [index, value] of datesRange.entries()) {
      if (differenceInDays(value.startDate, startDate) === 0 && differenceInDays(value.endDate, endDate) === 0) {
        return index
      }
    }
    return 0
  }

  getOptions = () => {
    // create options
    const { t, f } = this.props
    const { datesRange } = this.state
    const options = []
    for (const [index, value] of datesRange.entries()) {
      if (index === datesRange.length - 1) {
        options.push({value: index, name: t('SelectDates.last_12_months')})
      } else {
        options.push({value: index, name: capitalizeFirstLetter(f(value.startDate, 'MMMM YYYY'))})
      }
    }
    return options
  }

  onChange = (name, index) => {
    this.props.onChange(this.state.datesRange[index])
  }

  onChooseNext = () => {
    this.chooseOption(-1)
  }

  onChoosePrev = () => {
    this.chooseOption(+1)
  }

  chooseOption = inc => {
    const index = this.getSelectedIndex()
    const options = this.getOptions()
    const newIndex = index + inc
    if (newIndex > -1 && index < options.length) {
      this.onChange(null, newIndex)
    }
  }

  render ({t, f, startDate, endDate}, {scrolling}) {
    const selected = this.getSelectedIndex()
    const options = this.getOptions()
    return (
      <div className={cx(styles['select-dates'], scrolling && styles['select-dates--scrolling'])}>
        <button disabled={selected === options.length - 1} className={styles['prev-button']} onClick={this.onChoosePrev}>
          <Icon height='1rem' icon={arrowLeft} />
        </button>
        <Select className={styles['select-dates-select']} name='datesRange' value={selected} options={options} onChange={this.onChange} />
        <button disabled={selected === 0} className={styles['next-button']} onClick={this.onChooseNext}>
          <Icon width='auto' height='auto' className={styles['next-icon']} icon={arrowLeft} />
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  startDate: getStartDate(state),
  endDate: getEndDate(state)
})

const mapDispatchToProps = dispatch => ({
  onChange: (dateRange) => {
    dispatch(addFilterByDates(dateRange.startDate, dateRange.endDate))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(translate()(SelectDates))
