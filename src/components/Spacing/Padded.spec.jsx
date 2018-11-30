/* global mount */

import React from 'react'
import Padded from './Padded'

describe('Padded', () => {
  it(`should display children`, () => {
    expect(mount(<Padded>content</Padded>)).toMatchSnapshot()
  })

  it(`should extend className`, () => {
    expect(
      mount(<Padded className="noPaddingBottom">content</Padded>)
    ).toMatchSnapshot()
  })
})
