import React from 'react'
import PropTypes from 'prop-types'
import { mount } from 'enzyme'
import {
  CreditReserveSection,
  CharacteristicsSection,
  PaymentsSection,
  KeyInfosSection,
  Section,
  Row
} from './LoanDetailsPage'

describe('keys infos section', () => {
  describe('when at least one relevant data is defined', () => {
    it('should render defined data', () => {
      const wrapper = mount(
        <KeyInfosSection
          account={{
            loan: {
              usedAmount: 10000,
              rate: 2
            },
            balance: -2000
          }}
        />,
        {
          context: {
            t: key => key
          },
          childContextTypes: {
            t: PropTypes.func
          }
        }
      )

      expect(wrapper.find(Section)).toHaveLength(1)
      expect(wrapper.find(Row)).toHaveLength(3)
    })
  })

  describe('when no relevant data is defined', () => {
    it('should not render', () => {
      const wrapper = mount(<KeyInfosSection account={{}} />, {
        context: {
          t: key => key
        },
        childContextTypes: {
          t: PropTypes.func
        }
      })

      expect(wrapper.html()).toBe('')
    })
  })
})

describe('payments section', () => {
  describe('when at least one relevant data is defined', () => {
    it('should render defined data', () => {
      const wrapper = mount(
        <PaymentsSection
          account={{
            loan: {
              lastPaymentAmount: 1000,
              nextPaymentAmount: 1000
            }
          }}
        />,
        {
          context: {
            t: key => key
          },
          childContextTypes: {
            t: PropTypes.func
          }
        }
      )

      expect(wrapper.find(Section)).toHaveLength(1)
      expect(wrapper.find(Row)).toHaveLength(2)
    })
  })

  describe('when no relevant data is defined', () => {
    it('should not render', () => {
      const wrapper = mount(<PaymentsSection account={{}} />, {
        context: {
          t: key => key
        },
        childContextTypes: {
          t: PropTypes.func
        }
      })

      expect(wrapper.html()).toBe('')
    })
  })
})

describe('characteristics section', () => {
  describe('when at least one relevant data is defined', () => {
    it('should render defined data', () => {
      const wrapper = mount(
        <CharacteristicsSection
          account={{
            loan: {
              subscriptionDate: '2019-11-01',
              maturityDate: '2020-11-01',
              nbPaymentsLeft: 12,
              nbPaymentsDone: 0
            }
          }}
        />,
        {
          context: {
            t: key => key,
            f: date => date
          },
          childContextTypes: {
            t: PropTypes.func,
            f: PropTypes.func
          }
        }
      )

      expect(wrapper.find(Section)).toHaveLength(1)
      expect(wrapper.find(Row)).toHaveLength(4)
    })
  })

  describe('when no relevant data is defined', () => {
    it('should not render', () => {
      const wrapper = mount(<CharacteristicsSection account={{}} />, {
        context: {
          t: key => key
        },
        childContextTypes: {
          t: PropTypes.func
        }
      })

      expect(wrapper.html()).toBe('')
    })
  })
})

describe('credit reserve section', () => {
  describe('when the account type is revolving credit', () => {
    describe('when at least one relevant data is defined', () => {
      it('should render defined data', () => {
        const wrapper = mount(
          <CreditReserveSection
            account={{
              loan: {
                totalAmount: 10000,
                availableAmount: 5000
              },
              type: 'RevolvingCredit'
            }}
          />,
          {
            context: {
              t: key => key
            },
            childContextTypes: {
              t: PropTypes.func
            }
          }
        )

        expect(wrapper.find(Section)).toHaveLength(1)
        expect(wrapper.find(Row)).toHaveLength(2)
      })
    })

    describe('when no relevant data is defined', () => {
      it('should not render', () => {
        const wrapper = mount(
          <CreditReserveSection account={{ type: 'RevolvingCredit' }} />,
          {
            context: {
              t: key => key
            },
            childContextTypes: {
              t: PropTypes.func
            }
          }
        )

        expect(wrapper.html()).toBe('')
      })
    })
  })

  describe('when the account is not of type revolving credit', () => {
    it('should not render', () => {
      const wrapper = mount(
        <CreditReserveSection account={{ type: 'RevolvingCredit' }} />,
        {
          context: {
            t: key => key
          },
          childContextTypes: {
            t: PropTypes.func
          }
        }
      )

      expect(wrapper.html()).toBe('')
    })
  })
})
