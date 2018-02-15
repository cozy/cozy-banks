import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'components/Select'
import { subDays, subMonths, format, endOfDay, parse } from 'date-fns'
import { translate } from 'cozy-ui/react/I18n'
import { getPeriod, addFilterByPeriod } from '.'

import styles from './SelectDates.styl'
import Icon from 'cozy-ui/react/Icon'
import arrowLeft from 'assets/icons/icon-arrow-left.svg'
import cx from 'classnames'
import scrollAware from './scrollAware'
import { flowRight as compose, findIndex } from 'lodash'

const getPeriods = () => {
  const periods = []
  const now = endOfDay(new Date())

  for (const monthNumber of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]) {
    const month = format(subMonths(now, monthNumber), 'YYYY-MM')
    periods.push(month)
  }

  // last year
  const lastYear = subDays(now, 365)
  periods.push([lastYear, now])

  return periods
}

const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

class SelectDates extends Component {
  state = {
    periods: getPeriods()
  }

  getSelectedIndex = () => {
    const { periods } = this.state
    const { period } = this.props
    const index = findIndex(periods, x => x === period)
    return index > -1 ? index : 0
  }

  getOptions = () => {
    // create options
    const { t, f } = this.props
    const { periods } = this.state
    const options = []
    for (const [index, value] of periods.entries()) {
      if (index === periods.length - 1) {
        options.push({value: index, name: t('SelectDates.last_12_months')})
      } else {
        const date = parse(value, 'YYYY-MM')
        options.push({value: index, name: capitalizeFirstLetter(f(date, 'MMMM YYYY'))})
      }
    }
    return options
  }

  onChange = (name, index) => {
    this.props.onChange(this.state.periods[index])
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

  render ({t, f, startDate, endDate, scrolling}) {
    const selected = this.getSelectedIndex()
    const options = this.getOptions()
    return (
      <div className={cx(styles['select-dates'], scrolling && styles['select-dates--scrolling'])}>
        <button disabled={selected === options.length - 1} className={styles['prev-button']} onClick={this.onChoosePrev}>
          <Icon height='1rem' icon={arrowLeft} />
        </button>
        <Select className={styles['select-dates-select']} name='periods' value={selected} options={options} onChange={this.onChange} />
        <button disabled={selected === 0} className={styles['next-button']} onClick={this.onChooseNext}>
          <Icon height='1rem' className={styles['next-icon']} icon={arrowLeft} />
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  period: getPeriod(state)
})

const mapDispatchToProps = dispatch => ({
  onChange: period => {
    dispatch(addFilterByPeriod(period))
  }
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  translate(),
  scrollAware
)(SelectDates)
