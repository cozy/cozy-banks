import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import uniqBy from 'lodash/uniqBy'
import find from 'lodash/find'
import findLast from 'lodash/findLast'
import { subMonths, format, endOfDay, parse } from 'date-fns'
import { translate } from 'cozy-ui/react/I18n'
import { getPeriod, addFilterByPeriod } from '.'

import styles from './SelectDates.styl'
import Icon from 'cozy-ui/react/Icon'
import Chip from 'cozy-ui/react/Chip'
import Select from 'components/Select'
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

  return periods
}

const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

class DateYearSelector extends PureComponent {
  onChangeMonth = month => {
    this.onChange(this.props.selected.year + '-' + month)
  }

  onChangeYear = year => {
    this.onChange(year + '-' + this.props.selected.month)
  }

  onChange = value => {
    if (!find(this.props.options, x => x.value == value)) {
      const past = x => x.value < value
      const future = x => x.value > value
      const findValue = searchInPast =>
        searchInPast
          ? find(this.props.options, past)
          : findLast(this.props.options, future)

      const searchInPast = value < this.props.selected.value
      let nearest = findValue(searchInPast)
      if (!nearest) {
        nearest = findValue(!searchInPast)
      }
      value = nearest.value
    }
    this.props.onChange(value)
  }

  render() {
    const { selected } = this.props
    const selectedYear = selected.year
    const selectedMonth = selected.month
    const years = uniqBy(this.props.options, x => x.year)
    const months = this.props.options.filter(x => x.year === selectedYear)

    return (
      <span>
        <Chip>
          <Select
            name="year"
            value={selectedYear}
            options={years.map(x => ({ value: x.year, name: x.yearF }))}
            onChange={this.onChangeYear}
          />
          <Chip.Separator />
          <Select
            name="month"
            className={styles.SelectDates__month}
            value={selectedMonth}
            options={months.map(x => ({ value: x.month, name: x.monthF }))}
            onChange={this.onChangeMonth}
          />
        </Chip>
      </span>
    )
  }
}

class SelectDatesDumb extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      periods: getPeriods()
    }
  }

  getSelectedIndex = () => {
    const { periods } = this.state
    const { period } = this.props
    const index = findIndex(periods, x => x === period)
    return index > -1 ? index : 0
  }

  getOptions = () => {
    // create options
    const { f } = this.props
    const { periods } = this.state
    const options = []
    for (const [index, value] of periods.entries()) {
      if (index === periods.length - 1 && this.props.showTwelveMonths) {
        // options.push({ value: index, name: t('SelectDates.last_12_months') })
      } else {
        const date = parse(value, 'YYYY-MM')
        options.push({
          value: value,
          year: format(date, 'YYYY'),
          month: format(date, 'MM'),
          yearF: capitalizeFirstLetter(f(date, 'YYYY')),
          monthF: capitalizeFirstLetter(f(date, 'MMMM'))
        })
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

  render({ scrolling }) {
    const selected = this.getSelectedIndex()
    const options = this.getOptions()

    return (
      <div
        className={cx(
          styles.SelectDates,
          scrolling && styles['SelectDates--scrolling']
        )}
      >
        <DateYearSelector
          options={options}
          selected={options[selected]}
          onChange={v => this.props.onChange(v)}
        />
        <Chip.Round
          className={styles.SelectDates__Button}
          onClick={this.onChoosePrev}
        >
          <Icon icon="back" />
        </Chip.Round>

        <Chip.Round
          className={styles.SelectDates__Button}
          onClick={this.onChooseNext}
        >
          <Icon icon="forward" />
        </Chip.Round>
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

const SelectDates = compose(translate(), scrollAware)(SelectDatesDumb)

export default SelectDates
export const ConnectedSelectDates = connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectDates)
