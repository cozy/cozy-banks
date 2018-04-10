import React, { Component } from 'react'
import { translate, Button, withBreakpoints } from 'cozy-ui/react'
import { flowRight as compose } from 'lodash'

import Topbar from 'components/Topbar'
import CollectLink from 'ducks/settings/CollectLink'

import calculator from 'assets/icons/icon-calculator.svg'
import watch from 'assets/icons/icon-watch.svg'
import cozy from 'assets/icons/icon-cozy.svg'
import palette from 'cozy-ui/stylus/settings/palette.json'

import {
  Hero,
  Sections,
  Section,
  Title,
  Subtitle,
  Paragraph,
  Icon,
  CTA
} from './Hero'

class Onboarding extends Component {
  render() {
    const { t, breakpoints: { isMobile } } = this.props

    return (
      <Hero>
        <Topbar>
          <Title>
            {t(`Onboarding.title.${isMobile ? 'mobile' : 'desktop'}`)}
          </Title>
        </Topbar>
        <Sections>
          <Section>
            <Icon color={palette.pomegranate} icon={calculator} />
            <Subtitle>{t('Onboarding.manage-budget.title')}</Subtitle>
            <Paragraph>{t('Onboarding.manage-budget.description')}</Paragraph>
          </Section>
          <Section>
            <Icon color={palette.portage} icon={watch} />
            <Subtitle>{t('Onboarding.save-time.title')}</Subtitle>
            <Paragraph>{t('Onboarding.save-time.description')}</Paragraph>
          </Section>
          <Section>
            <Icon color={palette['dodgerBlue']} icon={cozy} />
            <Subtitle>{t('Onboarding.cozy-assistant.title')}</Subtitle>
            <Paragraph>{t('Onboarding.cozy-assistant.description')}</Paragraph>
          </Section>
        </Sections>
        <CTA>
          <CollectLink>
            <Button theme="regular">
              {t('Onboarding.connect-bank-account')}
            </Button>
          </CollectLink>
        </CTA>
      </Hero>
    )
  }
}

export default compose(translate(), withBreakpoints())(Onboarding)
