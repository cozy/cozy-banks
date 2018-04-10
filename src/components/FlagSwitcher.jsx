import React from 'react'
import flag from 'utils/flag'

const FlagInput = ({ name }) => {
  return (
    <input
      type="checkbox"
      checked={flag(name)}
      onChange={ev =>
        flag(name, JSON.parse(ev.target.checked)) && this.props.onChange()
      }
    />
  )
}

const style = {
  borderBottomLeftRadius: '.5rem',
  padding: '.5rem',
  position: 'absolute',
  zIndex: 1000,
  color: 'white',
  background: 'rgba(74,68,90,0.85)',
  top: 0,
  right: 0
}

const human = name => {
  return name.replace(/[a-z][A-Z]/g, str => str[0] + ' ' + str[1].toLowerCase())
}

export default class extends React.Component {
  render() {
    return (
      flag('switcher') && (
        <div className="flag-switcher" style={style}>
          <button onClick={() => this.setState({ date: Date.now() })}>
            refresh
          </button>&nbsp;
          <button
            onClick={() =>
              flag.reset() && flag('switcher', true) && this.forceUpdate()
            }
          >
            reset
          </button>
          {flag.list().map(name => {
            return (
              <div>
                {human(name)} :{' '}
                <FlagInput onChange={() => this.forceUpdate()} name={name} />
              </div>
            )
          })}
        </div>
      )
    )
  }
}
