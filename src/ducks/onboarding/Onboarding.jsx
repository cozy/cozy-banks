import React from 'react'
import { translate, Button } from 'cozy-ui/react'

import calculator from 'assets/icons/icon-calculator.svg'
import watch from 'assets/icons/icon-watch.svg'
import cozy from 'assets/icons/icon-cozy.svg'
import flash from 'ducks/flash'

import {
  Hero, Sections, Section, Title, Subtitle,
  Paragraph, Icon, CTA
} from './Hero'

const RED = '#f52d2d'
const PURPLE = '#a75bcb'
const BLUE = '#2d8af2'

const Onboarding = ({t}) => (
  <Hero>
    <Title>{t('Onboarding.title')}</Title>
    <Sections>
      <Section>
        <Icon color={RED} icon={calculator} />
        <Subtitle>{t('Onboarding.manage-budget.title')}</Subtitle>
        <Paragraph>{t('Onboarding.manage-budget.description')}</Paragraph>
      </Section>
      <Section>
        <Icon color={PURPLE} icon={watch} />
        <Subtitle>{t('Onboarding.save-time.title')}</Subtitle>
        <Paragraph>{t('Onboarding.save-time.description')}</Paragraph>
      </Section>
      <Section>
        <Icon color={BLUE} icon={cozy} />
        <Subtitle>{t('Onboarding.cozy-assistant.title')}</Subtitle>
        <Paragraph>{t('Onboarding.cozy-assistant.description')}</Paragraph>
      </Section>
    </Sections>
    <CTA>
      <Button theme='regular' onClick={() => flash(t('ComingSoon.description'))}>
        {t('Onboarding.connect-bank-account')}
      </Button>
    </CTA>
  </Hero>
)

export default translate()(Onboarding)
