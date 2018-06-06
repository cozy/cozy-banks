import React from 'react'
import PropTypes from 'prop-types'

import { uniqBy, find, findLast, flowRight as compose, findIndex } from 'lodash'

import {
  subMonths,
  format,
  endOfDay,
  parse,
  differenceInCalendarMonths
} from 'date-fns'
import { translate } from 'cozy-ui/react/I18n'

import withBreakpoints from 'cozy-ui/react/helpers/withBreakpoints'

import styles from './SelectDates.styl'
import Icon from 'cozy-ui/react/Icon'
import Chip from 'cozy-ui/react/Chip'
import Select from 'components/Select'
import cx from 'classnames'
import scrollAware from './scrollAware'

const start2016 = new Date(2015, 11, 31)

const getPeriods = () => {
  const periods = []
  const now = endOfDay(new Date())

  for (let i = 0; i < differenceInCalendarMonths(now, start2016); i++) {
    const month = format(subMonths(now, i), 'YYYY-MM')
    periods.push(month)
  }

  return periods
}

const isAllYear = value => value.includes('allyear')

const getOptionValue = option => option.value
const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

const Separator = () => (
  <Chip.Separator className={styles.SelectDates__separator} />
)

const constrain = (val, min, max) => Math.min(Math.max(val, min), max)

const selectYearContainerStyle = base => ({
  ...base,
  flexGrow: 1,
  paddingLeft: '0.875rem'
})
const selectMonthContainerStyle = base => ({
  ...base,
  flexGrow: 6,
  paddingLeft: '0.875rem'
})

const SelectDateButton = ({ children, disabled, className, ...props }) => {
  return (
    <Chip.Round
      {...props}
      onClick={!disabled && props.onClick}
      className={cx(
        styles.SelectDates__Button,
        styles.SelectDates__chip,
        className,
        {
          [styles['SelectDates__Button--disabled']]: disabled
        }
      )}
    >
      {children}
    </Chip.Round>
  )
}

const isFullYearValue = value => value && value.length === 4

class SelectDatesDumb extends React.PureComponent {
  getSelectedIndex = () => {
    const { periods, value } = this.props
    return findIndex(periods, x => x === value)
  }

  getSelected() {
    const index = this.getSelectedIndex()
    const options = this.getOptions()
    let res = options[index]
    if (res) {
      return res
    }
    // all year must be selected
    if (this.props.value) {
      return {
        year: this.props.value,
        month: 'allyear'
      }
    }
    return options[0]
  }

  getOptions = () => {
    // create options
    const { f, periods } = this.props
    const options = []

    const years = {}
    for (const value of periods) {
      const date = parse(value, 'YYYY-MM')
      const year = format(date, 'YYYY')
      years[year] = true
      options.push({
        value: value,
        year,
        month: format(date, 'MM'),
        yearF: year,
        monthF: capitalizeFirstLetter(f(date, 'MMMM'))
      })
    }

    return options
  }

  handleChooseNext = () => {
    this.chooseOption(-1)
  }

  handleChoosePrev = () => {
    this.chooseOption(+1)
  }

  handleChangeMonth = month => {
    const selected = this.getSelected()
    this.onChangeYearMonth(selected.year, month)
  }

  handleChangeYear = year => {
    const selected = this.getSelected()
    this.onChangeYearMonth(year, selected.month)
  }

  onChangeYearMonth = (year, month) => {
    if (month) {
      this.handleChangeSelector(year + '-' + month)
    } else {
      this.handleChangeSelector(year)
    }
  }

  onChange = value => {
    const allyear = isAllYear(value)
    const selected = this.getSelected()
    const options = this.getOptions()
    const matchingOption = find(options, opt => getOptionValue(opt) === value)
    if (!allyear && !matchingOption) {
      const past = x => x.value < value
      const future = x => x.value > value
      const findValue = searchInPast =>
        searchInPast ? find(options, past) : findLast(options, future)

      const searchInPast = value < selected.value
      let nearest = findValue(searchInPast)
      if (!nearest) {
        nearest = findValue(!searchInPast)
      }
      value = nearest.value
    }
    if (value.includes('allyear')) {
      value = value.substr(0, 4)
    }
    this.props.onChange(value)
  }

  getAvailableYears() {
    const options = this.getOptions()
    return uniqBy(options.map(option => option.year))
  }

  chooseOption = inc => {
    const index = this.getSelectedIndex()
    const options = this.getOptions()
    const currentValue = this.props.value
    if (!isFullYearValue(currentValue)) {
      const newIndex = index + inc
      if (newIndex > -1 && index < options.length) {
        const value = options[newIndex].value
        this.props.onChange(value)
      }
    } else {
      const availableYears = this.getAvailableYears()
      const current = availableYears.indexOf(currentValue)
      const newIndex = constrain(current + inc, 0, availableYears.length - 1)
      this.props.onChange(availableYears[newIndex])
    }
  }

  handleChangeSelector = chosenValue => {
    this.onChange(chosenValue)
  }

  render() {
    const {
      scrolling,
      showFullYear,
      value,
      t,
      breakpoints: { isMobile }
    } = this.props
    const index = this.getSelectedIndex()
    const options = this.getOptions()
    const selected = this.getSelected()

    // divide options between year and months
    const years = uniqBy(options, x => x.year)

    const selectedYear = selected.year
    const selectedMonth = selected.month

    const months = options.filter(x => x.year === selectedYear)
    const monthsOptions = months.map(x => ({
      value: x.month,
      name: x.monthF
    }))

    if (showFullYear) {
      monthsOptions.push({
        value: 'allyear',
        name: t('SelectDates.all_year'),
        fixed: true
      })
    }

    const yearMode = isFullYearValue(value)
    let availableYears, yearIndex
    if (yearMode) {
      availableYears = this.getAvailableYears()
      yearIndex = availableYears.indexOf(value)
    }
    return (
      <div
        className={cx(
          styles.SelectDates,
          scrolling && styles['SelectDates--scrolling']
        )}
      >
        <span className={styles['SelectDates__DateYearSelector']}>
          <Chip className={cx(styles.SelectDates__chip)}>
            <Select
              name="year"
              className={styles.SelectDates__SelectYear}
              searchable={false}
              width={isMobile ? '4rem' : '6rem'}
              value={selectedYear}
              options={years.map(x => ({ value: x.year, name: x.yearF }))}
              onChange={this.handleChangeYear}
              styles={
                isMobile
                  ? {
                      container: selectYearContainerStyle
                    }
                  : {}
              }
            />
            <Separator />
            <Select
              searchable={false}
              name="month"
              width={isMobile ? 'auto' : '10rem'}
              className={styles.SelectDates__SelectMonth}
              value={selectedMonth}
              options={monthsOptions}
              onChange={this.handleChangeMonth}
              styles={
                isMobile
                  ? {
                      container: selectMonthContainerStyle
                    }
                  : {}
              }
            />
          </Chip>
        </span>

        <span className={styles.SelectDates__buttons}>
          {isMobile && <Separator />}
          <SelectDateButton
            onClick={this.handleChoosePrev}
            disabled={
              yearMode
                ? yearIndex === availableYears.length - 1
                : index === options.length - 1
            }
            className={styles['SelectDates__Button--prev']}
          >
            <Icon icon="back" />
          </SelectDateButton>

          <SelectDateButton
            onClick={this.handleChooseNext}
            disabled={yearMode ? yearIndex === 0 : index === 0}
            className={styles['SelectDates__Button--next']}
          >
            <Icon icon="forward" />
          </SelectDateButton>
        </span>
      </div>
    )
  }
}

const SelectDates = compose(translate(), scrollAware, withBreakpoints())(
  SelectDatesDumb
)

SelectDates.defaultProps = {
  periods: getPeriods()
}

SelectDates.propTypes = {
  onChange: PropTypes.func.isRequired
}

export default SelectDates
