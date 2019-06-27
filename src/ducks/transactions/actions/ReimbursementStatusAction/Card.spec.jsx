import React from 'react'
import { DumbPhoneCard, DumbWebCard } from './Card'
import { mount } from 'enzyme'

const t = key => key

describe('DumbPhoneCard', () => {
  it('should render correctly with number and price', () => {
    const contact = {
      number: '01 23 45 67 89',
      price: '0,06€/min'
    }

    expect(
      mount(<DumbPhoneCard contact={contact} t={t} />).html()
    ).toMatchSnapshot()
  })

  it('should render correctly with only number', () => {
    const contact = {
      number: '01 23 45 67 89'
    }

    expect(
      mount(<DumbPhoneCard contact={contact} t={t} />).html()
    ).toMatchSnapshot()
  })
})

describe('DumbWebCard', () => {
  it('should render correctly', () => {
    const contact = {
      href: 'https://ameli.fr',
      action: 'sendCareSheet'
    }

    expect(
      mount(<DumbWebCard contact={contact} t={t} />).html()
    ).toMatchSnapshot()
  })
})
