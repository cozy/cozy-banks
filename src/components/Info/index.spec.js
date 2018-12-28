import React from 'react'
import { Infos } from '.'
import { shallow } from 'enzyme'

describe('Info', () => {
  it('should render its children', () => {
    expect(shallow(<Infos>Children</Infos>).getElement()).toMatchSnapshot()
  })

  it('should render with a title', () => {
    expect(
      shallow(<Infos title="title">Children</Infos>).getElement()
    ).toMatchSnapshot()
  })

  it('should render with an icon', () => {
    expect(
      shallow(<Infos icon="openwith">Children</Infos>).getElement()
    ).toMatchSnapshot()
  })

  it('should render with the right variant', () => {
    expect(
      shallow(<Infos variant="error">Children</Infos>).getElement()
    ).toMatchSnapshot()
  })
})
