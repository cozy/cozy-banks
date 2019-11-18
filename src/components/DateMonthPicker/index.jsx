import React, { useState } from 'react'
import { Button, translate, Icon, Bold } from 'cozy-ui/transpiled/react'
import range from 'lodash/range'
import { format } from 'date-fns'

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, auto)',
  gridTemplateRows: 'repeat(3, 3fr)',
  overflow: 'hidden'
}

const yearButtonStyle = {
  flexGrow: 0,
  minWidth: '3rem',
  minHeight: '3rem',
  textAlign: 'center',
  borderWidth: 0,
  margin: 0,
  color: 'var(--coolGrey)',
  background: 'none !important'
}

const monthButtonStyle = {
  minHeight: '3rem',
  minWidth: 0,
  margin: 0,
  border: 0,
  borderRadius: 0,
  fontWeight: 'normal',
  textTransform: 'none'
}

const selectedStyle = {
  color: 'var(--primaryColor)',
  fontWeight: 'bold'
}

const MonthButton = translate()(({ monthNum, f, onClick, isSelected }) => {
  const d = new Date(2019, monthNum, 15)
  const handleClick = () => {
    onClick(monthNum)
  }
  return (
    <Button
      theme="secondary"
      style={{
        ...monthButtonStyle,
        ...(isSelected ? selectedStyle : null)
      }}
      onClick={handleClick}
      label={f(d, 'MMM')}
    />
  )
})

const useCounter = (initialValue, min, max) => {
  const [state, setState] = useState(initialValue)
  const increment = () => setState(Math.min(state + 1, max))
  const decrement = () => setState(Math.max(state - 1, min))
  return [state, decrement, increment]
}

const DateMonthPicker = ({ initialValue, onSelect }) => {
  const [initialYear, initialMonth] = initialValue
    .split('-')
    .map(x => parseInt(x, 10))
  const [year, decreaseYear, increaseYear] = useCounter(
    parseInt(initialYear, 10),
    1990,
    Infinity
  )
  const handleClickMonth = month => {
    const d = new Date(year, month, 1)
    onSelect(format(d, 'YYYY-MM-DD'))
  }

  return (
    <>
      <div className="u-media u-mb-1">
        <Button
          style={yearButtonStyle}
          theme="secondary"
          size="small"
          onClick={decreaseYear}
          icon={<Icon icon="left" />}
        />
        <Bold
          className="u-media-grow u-ta-center"
          style={{
            ...(year === initialYear ? selectedStyle : null)
          }}
        >
          {year}
        </Bold>
        <Button
          style={yearButtonStyle}
          theme="secondary"
          size="small"
          onClick={increaseYear}
          icon={<Icon icon="right" />}
        />
      </div>
      <div style={gridStyle}>
        {range(0, 12).map(i => (
          <MonthButton
            key={i}
            isSelected={initialMonth - 1 === i && year == initialYear}
            monthNum={i}
            onClick={handleClickMonth}
          />
        ))}
      </div>
    </>
  )
}

export default DateMonthPicker
