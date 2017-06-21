import React, { Component } from 'react'
import { connect } from 'react-redux'
import Select from 'components/Select'
import { subMonths, startOfMonth, endOfMonth, differenceInDays, endOfDay } from 'date-fns'
import { translate } from 'cozy-ui/react/I18n'
import { getStartDate, getEndDate, addFilterByDates } from '.'

const createRange = (startDate, endDate) => ({ startDate, endDate })

const getDatesRange = () => {
  const datesRange = []
  const now = endOfDay(new Date())

  datesRange.push(createRange(subMonths(now, 12), now))
  datesRange.push(createRange(startOfMonth(now), now))

  for (let monthNumber of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]) {
    const month = subMonths(now, monthNumber)
    datesRange.push(createRange(startOfMonth(month), endOfMonth(month)))
  }

  return datesRange
}

function capitalizeFirstLetter (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export class SelectDates extends Component {
  constructor (props) {
    super(props)

    this.onChange = this.onChange.bind(this)
    this.getSelected = this.getSelected.bind(this)

    const dates = getDatesRange()
    this.state = {
      datesRange: dates
    }
  }

  getSelected (datesRange, startDate, endDate) {
    for (const [index, value] of datesRange.entries()) {
      if (differenceInDays(value.startDate, startDate) === 0 && differenceInDays(value.endDate, endDate) === 0) {
        return index
      }
    }
    return 1
  }

  onChange (name, index) {
    this.props.onChange(this.state.datesRange[index])
  }

  render ({t, f, startDate, endDate}) {
    const { datesRange } = this.state
    const selected = this.getSelected(datesRange, startDate, endDate)

    // create options
    const options = []
    for (const [index, value] of datesRange.entries()) {
      if (index === 0) {
        options.push({value: index, name: t('SelectDates.last_12_months')})
      } else if (index === 1) {
        options.push({value: index, name: t('SelectDates.progress_month')})
      } else {
        options.push({value: index, name: capitalizeFirstLetter(f(value.startDate, 'MMMM YYYY'))})
      }
    }

    return (
      <Select name='datesRange' value={selected} options={options} onChange={this.onChange} />
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  startDate: getStartDate(state),
  endDate: getEndDate(state)
})

export const mapDispatchToProps = (dispatch, ownProps) => ({
  onChange: (dateRange) => {
    dispatch(addFilterByDates(dateRange.startDate, dateRange.endDate))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(translate()(SelectDates))
