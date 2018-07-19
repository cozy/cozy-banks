/* global __TARGET__ */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { translate, Button, withBreakpoints } from 'cozy-ui/react'
import { some, flowRight as compose } from 'lodash'
import { getCollection, fetchCollection } from 'cozy-client'
import { TRIGGER_DOCTYPE } from 'doctypes'
import { isCollectionLoading } from 'utils/client'

import Topbar from 'components/Topbar'
import PageTitle from 'components/PageTitle'
import AddAccountLink from 'ducks/settings/AddAccountLink'

import calculator from 'assets/icons/icon-calculator.svg'
import watch from 'assets/icons/icon-watch.svg'
import cozy from 'assets/icons/icon-cozy.svg'
import palette from 'cozy-ui/stylus/settings/palette.json'

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
    this.props.fetchTriggers()
    if (__TARGET__ === 'mobile') {
      document.addEventListener('resume', this.props.fetchTriggers, false)
    }
  }

  componentWillUnmount() {
    if (__TARGET__ === 'mobile') {
      document.removeEventListener('resume', this.props.fetchTriggers, false)
    }
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

const mapStateToProps = state => ({
  triggers: getCollection(state, 'triggers')
})

const mapDispatchToProps = dispatch => ({
  fetchTriggers: () => dispatch(fetchCollection('triggers', TRIGGER_DOCTYPE))
})

export default compose(
  translate(),
  withBreakpoints(),
  connect(mapStateToProps, mapDispatchToProps)
)(Onboarding)
