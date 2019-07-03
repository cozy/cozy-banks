import React from 'react'
import Padded from 'components/Spacing/Padded'
import { translate, Input } from 'cozy-ui/transpiled/react'
import PageTitle from 'components/Title/PageTitle'
import TextCard from 'components/TextCard'
import OptionalInput from 'components/OptionalInput'
import BottomButton from 'components/BottomButton'
import AccountIcon from 'components/AccountIcon'

const _Summary = ({
  amount,
  senderAccount,
  beneficiary,
  onConfirm,
  active,
  selectSlide,
  t,
  onChangeLabel,
  label,
  onChangeDate,
  date
}) =>
  amount && senderAccount && beneficiary ? (
    <Padded>
      {active && <PageTitle>{t('Transfer.summary.page-title')}</PageTitle>}
      <div>
        {t('Transfer.summary.send')}{' '}
        <TextCard
          className="u-clickable"
          onClick={selectSlide.bind(null, 'amount')}
        >
          {amount}€
        </TextCard>
        <br />
        {t('Transfer.summary.to')}{' '}
        <TextCard
          className="u-clickable"
          onClick={selectSlide.bind(null, 'beneficiary')}
        >
          {beneficiary.label}
        </TextCard>
        <br />
        {t('Transfer.summary.from')}{' '}
        <TextCard
          className="u-clickable"
          onClick={selectSlide.bind(null, 'sender')}
        >
          {/* TODO, remove key when AccountIcon correctly updates on account change (https://github.com/cozy/cozy-ui/issues/1076) */}
          <AccountIcon
            key={senderAccount._id}
            size="small"
            account={senderAccount}
          />{' '}
          {senderAccount.label}
        </TextCard>
        <br />
        {t('Transfer.summary.on')}{' '}
        <TextCard className="u-clickable">
          <Input type="date" value={date} onChange={onChangeDate} size="tiny" />
        </TextCard>
        <br />
        {t('Transfer.summary.for')}{' '}
        <OptionalInput
          value={label}
          onChange={onChangeLabel}
          placeholder={t('Transfer.summary.for-placeholder')}
        />
        <BottomButton
          label={t('Transfer.summary.confirm')}
          visible={active}
          onClick={onConfirm}
        />
      </div>
    </Padded>
  ) : null

const Summary = React.memo(translate()(_Summary))

export default Summary
