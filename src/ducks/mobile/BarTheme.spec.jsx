/* global mount */

import React from 'react'
import BarTheme from './BarTheme'
import { setBarTheme } from 'ducks/mobile/utils'

jest.mock('ducks/mobile/utils')

class Testing extends React.Component {
  constructor(props) {
    super(props)
    this.state = { themes: [] }
  }
  addTheme(theme) {
    const themes = this.state.themes
    themes.push(theme)
    this.setState({ themes })
  }

  removeTheme() {
    const themes = this.state.themes
    themes.splice(themes.length - 1, 1)
    this.setState({ themes })
  }

  render() {
    return (
      <div>
        {this.state.themes.map(theme => (
          <BarTheme key={theme} theme={theme} />
        ))}
      </div>
    )
  }
}

describe('BarTheme', () => {
  beforeEach(() => {
    setBarTheme.mockReset()
  })

  it('should set the theme of the last', () => {
    const root = mount(<Testing />)
    const inst = root.instance()
    inst.addTheme('A')
    inst.addTheme('B')
    inst.addTheme('C')
    expect(setBarTheme).toHaveBeenLastCalledWith('C')
    inst.removeTheme()
    expect(setBarTheme).toHaveBeenLastCalledWith('B')
    inst.removeTheme()
    expect(setBarTheme).toHaveBeenLastCalledWith('A')
    inst.removeTheme()
    expect(setBarTheme).toHaveBeenLastCalledWith('default')
  })
})
