/* global shallow */

import React from 'react'
import SelectDates from './SelectDates'
import AppLike from '../../../test/AppLike'

describe('SelectDates', () => {
  it('should render correctly', () => {
    let root = shallow(
      <AppLike>
        <SelectDates onChange={() => null} />
      </AppLike>
    )
    expect(root.html()).toMatchSnapshot()
  })
})
