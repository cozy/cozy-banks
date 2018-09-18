/* global __TARGET__ */
import React, { Component } from 'react'
import { translate, Button, withBreakpoints } from 'cozy-ui/react'
import { some, flowRight as compose } from 'lodash'
import { withClient, queryConnect } from 'cozy-client'

import Topbar from 'components/Topbar'
import PageTitle from 'components/PageTitle'
import AddAccountLink from 'ducks/settings/AddAccountLink'

import calculator from 'assets/icons/icon-calculator.svg'
import watch from 'assets/icons/icon-watch.svg'
import cozy from 'assets/icons/icon-cozy.svg'
import palette from 'cozy-ui/stylus/settings/palette.json'
import { triggersConn } from 'doctypes'
import { isCollectionLoading } from 'ducks/client/utils'

import {
  Hero,
  Sections,
  Section,
  Subtitle,
  Paragraph,
  Icon,
  CTA
} from 'cozy-ui/react/Hero'

class Onboarding extends Component {
  componentDidMount() {
    if (__TARGET__ === 'mobile') {
      document.addEventListener('resume', this.fetchTriggers, false)
    }
  }

  componentWillUnmount() {
    if (__TARGET__ === 'mobile') {
      document.removeEventListener('resume', this.fetchTriggers, false)
    }
  }

  async fetchTriggers() {
    await triggersConn.query(this.props.client)
  }

  render() {
    const {
      t,
      triggers,
      breakpoints: { isMobile }
    } = this.props

    const isTriggersLoaded = !isCollectionLoading(triggers)
    const hasTriggers = some(
      triggers.data,
      trigger => trigger.worker === 'konnector'
    )

    return (
      <Hero>
        <Topbar>
          <PageTitle style="text-align: center">
            {t(`Onboarding.title.${isMobile ? 'mobile' : 'desktop'}`)}
          </PageTitle>
        </Topbar>
        <Sections>
          <Section>
            <Icon color={palette.pomegranate} icon={calculator} />
            <Subtitle>{t('Onboarding.manage-budget.title')}</Subtitle>
            <Paragraph>{t('Onboarding.manage-budget.description')}</Paragraph>
          </Section>
          {!isMobile && (
            <Section>
              <Icon color={palette.portage} icon={watch} />
              <Subtitle>{t('Onboarding.save-time.title')}</Subtitle>
              <Paragraph>{t('Onboarding.save-time.description')}</Paragraph>
            </Section>
          )}
          {!isMobile && (
            <Section>
              <Icon color={palette['dodgerBlue']} icon={cozy} />
              <Subtitle>{t('Onboarding.cozy-assistant.title')}</Subtitle>
              <Paragraph>
                {t('Onboarding.cozy-assistant.description')}
              </Paragraph>
            </Section>
          )}
        </Sections>
        <CTA>
          <AddAccountLink>
            <Button theme="regular">
              {t('Onboarding.connect-bank-account')}
            </Button>
          </AddAccountLink>
        </CTA>
        {isTriggersLoaded &&
          hasTriggers && (
            <Paragraph style="text-align: center">
              {t('Onboarding.wait-moments')}
            </Paragraph>
          )}
      </Hero>
    )
  }
}

export default compose(
  translate(),
  withBreakpoints(),
  withClient,
  queryConnect({
    triggers: { ...triggersConn, as: 'onboarding_triggers' }
  })
)(Onboarding)
