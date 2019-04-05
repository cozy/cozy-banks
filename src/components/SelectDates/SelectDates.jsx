import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { uniqBy, find, findLast, flowRight as compose, findIndex } from 'lodash'

import {
  subMonths,
  format,
  endOfDay,
  parse,
  differenceInCalendarMonths
} from 'date-fns'
import { translate, withBreakpoints } from 'cozy-ui/react'
import Icon from 'cozy-ui/react/Icon'
import Chip from 'cozy-ui/react/Chip'

import styles from 'components/SelectDates/SelectDates.styl'
import Select from 'components/Select'
import cx from 'classnames'
import scrollAware from 'components/SelectDates/scrollAware'
import { rangedSome } from 'components/SelectDates/utils'
const start2016 = new Date(2015, 11, 31)

const getDefaultOptions = () => {
  const options = []
  const now = endOfDay(new Date())

  for (let i = 0; i < differenceInCalendarMonths(now, start2016); i++) {
    const month = format(subMonths(now, i), 'YYYY-MM')
    options.push({
      yearMonth: month
    })
  }

  return options
}

const isAllYear = value => value.includes('allyear')

const getOptionValue = option => option.value
const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

class Separator extends PureComponent {
  render() {
    return <Chip.Separator className={styles.SelectDates__separator} />
  }
}

const constrain = (val, min, max) => Math.min(Math.max(val, min), max)

const mobileYearContainerStyle = base => ({
  ...base,
  flexGrow: 1,
  flexBasis: '5.5rem',
  flexShrink: 0,
  padding: 0
})
const mobileMonthContainerStyle = base => ({
  ...base,
  flexGrow: 3,
  padding: 0
})

const mobileControlStyle = () => ({
  paddingLeft: '0.875rem'
})

const mobileMenuStyle = base => ({
  ...base,
  marginLeft: '0.5rem',
  marginRight: '0.5rem',
  width: '90%',
  minWidth: 'auto'
})

const textStyle = () => ({
  color: 'var(--primaryContrastTextColor)'
})

const getSelectStyle = (isMobile, isPrimary, type) => {
  const deviceStyle = isMobile
    ? {
        container:
          type === 'Month'
            ? mobileMonthContainerStyle
            : mobileYearContainerStyle,
        control: mobileControlStyle,
        menu: mobileMenuStyle
      }
    : {}
  const colorStyle = isPrimary
    ? {
        control: () => ({ paddingLeft: '0.875rem', minHeight: '2rem' }),
        indicatorsContainer: base => ({ ...base, height: '2rem' }),
        valueContainer: base => ({ ...base, padding: 'inherit' }),
        singleValue: textStyle,
        placeholder: textStyle
      }
    : {}

  return { ...deviceStyle, ...colorStyle }
}

class SelectDateButton extends PureComponent {
  render() {
    const { children, disabled, className, ...props } = this.props

    return (
      <Chip.Round
        {...props}
        onClick={!disabled ? props.onClick : null}
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
}

const isFullYearValue = value => value && value.length === 4
const isOptionEnabled = option => option && !option.isDisabled
const allDisabledFrom = (options, maxIndex) => {
  return !rangedSome(options, isOptionEnabled, maxIndex, -1)
}

class SelectDates extends PureComponent {
  getSelectedIndex = () => {
    const { options, value } = this.props
    return findIndex(options, x => x.yearMonth === value)
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
    const { f, options } = this.props

    return options.map(option => {
      const date = parse(option.yearMonth, 'YYYY-MM')
      const year = format(date, 'YYYY')
      return {
        value: option.yearMonth,
        year,
        disabled: option.disabled,
        month: format(date, 'MM'),
        yearF: year,
        monthF: capitalizeFirstLetter(f(date, 'MMMM'))
      }
    })
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
      color,
      t,
      breakpoints: { isMobile },
      className
    } = this.props
    const index = this.getSelectedIndex()
    const options = this.getOptions()
    const selected = this.getSelected()

    // divide options between year and months
    const years = uniqBy(options, x => x.year)

    const selectedYear = selected && selected.year
    const selectedMonth = selected && selected.month

    const months = options
    const allMonthsOptions = months.map(x => ({
      value: x.month,
      name: x.monthF,
      isDisabled: x.disabled,
      year: x.year
    }))
    const forCurrentYear = x => (selectedYear ? x.year === selectedYear : true)
    const monthsOptions = allMonthsOptions.filter(forCurrentYear)

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

    const isPrevButtonDisabled = yearMode
      ? yearIndex === availableYears.length - 1
      : index === options.length - 1

    const isNextButtonDisabled = yearMode
      ? yearIndex === 0
      : index === 0 || allDisabledFrom(allMonthsOptions, index - 1)

    const selectMonthStyle = getSelectStyle(
      isMobile,
      color === 'primary',
      'Month'
    )
    const selectYearStyle = getSelectStyle(
      isMobile,
      color === 'primary',
      'Year'
    )

    return (
      <div
        className={cx(
          styles.SelectDates,
          styles[`SelectDatesColor_${color}`],
          scrolling && styles['SelectDates--scrolling'],
          className
        )}
      >
        <span className={styles['SelectDates__DateYearSelector']}>
          <Chip className={cx(styles.SelectDates__chip)}>
            <div className={styles['SelectDates__SelectYearContainer']}>
              <Select
                name="year"
                placeholder={t('SelectDates.year')}
                className={styles.SelectDates__SelectYear}
                searchable={false}
                width={isMobile ? 'auto' : '6rem'}
                value={selectedYear}
                options={years.map(x => ({ value: x.year, name: x.yearF }))}
                onChange={this.handleChangeYear}
                styles={selectYearStyle}
              />
            </div>
            <Separator />
            <div className={styles['SelectDates__SelectMonthContainer']}>
              <Select
                searchable={false}
                name="month"
                placeholder={t('SelectDates.month')}
                width={isMobile ? 'auto' : '10rem'}
                className={styles.SelectDates__SelectMonth}
                value={selectedMonth}
                options={monthsOptions}
                onChange={this.handleChangeMonth}
                styles={selectMonthStyle}
              />
            </div>
          </Chip>
        </span>

        <span className={styles.SelectDates__buttons}>
          {isMobile && color !== 'primary' && <Separator />}
          <SelectDateButton
            onClick={this.handleChoosePrev}
            disabled={isPrevButtonDisabled}
            className={cx(styles['SelectDates__Button--prev'], {
              [styles.SelectDatesButtonDisabled]: isPrevButtonDisabled
            })}
          >
            <Icon icon="back" className={styles.SelectDatesButtonColor} />
          </SelectDateButton>

          <SelectDateButton
            onClick={this.handleChooseNext}
            disabled={isNextButtonDisabled}
            className={cx(styles['SelectDates__Button--next'], {
              [styles.SelectDatesButtonDisabled]: isNextButtonDisabled
            })}
          >
            <Icon icon="forward" className={styles.SelectDatesButtonColor} />
          </SelectDateButton>
        </span>
      </div>
    )
  }
}

SelectDates.defaultProps = {
  color: 'default',
  options: getDefaultOptions()
}

SelectDates.propTypes = {
  color: PropTypes.oneOf(['default', 'primary']),
  onChange: PropTypes.func.isRequired
}

export default compose(
  translate(),
  scrollAware,
  withBreakpoints()
)(SelectDates)
