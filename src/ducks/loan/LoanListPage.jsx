import React from 'react'
import { Section } from 'components/Section'
import LoanProgress from 'ducks/loan/LoanProgress'
import CompositeRow from 'cozy-ui/transpiled/react/CompositeRow'
import Icon from 'cozy-ui/transpiled/react/Icon'
import withBreakpoints from 'cozy-ui/transpiled/react/helpers/withBreakpoints'
import { Bold } from 'cozy-ui/transpiled/react/Text'
import AccountIcon from 'components/AccountIcon'
import withFilters from 'components/withFilters'
import { BalanceDetailsHeader } from 'ducks/balance'
import { Wrapper, Padded } from 'components/Spacing'

const PaddedOnDesktop = withBreakpoints()(props => {
  const {
    breakpoints: { isDesktop },
    children
  } = props

  if (isDesktop) {
    return <Padded>{children}</Padded>
  }

  return children
})

const DumbLoanListPage = props => {
  const { filteringDoc, filterByDoc } = props
  const accounts = filteringDoc.accounts.data

  return (
    <>
      <BalanceDetailsHeader showBalance />
      {accounts.map(account => (
        <Section key={account._id}>
          <Wrapper>
            <PaddedOnDesktop>
              <CompositeRow
                primaryText={
                  <div className="u-flex u-flex-items-center">
                    <AccountIcon account={account} />
                    <Bold className="u-ml-1">{account.label}</Bold>
                  </div>
                }
                right={<Icon icon="right" color="var(--coolGrey)" />}
                actions={<LoanProgress account={account} />}
                className="u-c-pointer"
                onClick={() => {
                  filterByDoc(account)
                }}
              />
            </PaddedOnDesktop>
          </Wrapper>
        </Section>
      ))}
    </>
  )
}

const LoanListPage = withFilters(DumbLoanListPage)

export default LoanListPage
