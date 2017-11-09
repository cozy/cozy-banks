import React, { Component } from 'react'
import { connect } from 'react-redux'
import { translate, Button } from 'cozy-ui/react'
import { openCollect } from 'ducks/settings/collectLink'
import { flowRight as compose } from 'lodash'
import { getUrlBySource, findApps } from 'ducks/apps'

import calculator from 'assets/icons/icon-calculator.svg'
import watch from 'assets/icons/icon-watch.svg'
import cozy from 'assets/icons/icon-cozy.svg'
import palette from 'utils/palette.json'

import {
  Hero, Sections, Section, Title, Subtitle,
  Paragraph, Icon, CTA
} from './Hero'

class Onboarding extends Component {
  componentDidMount () {
    this.props.fetchApps()
  }

  render () {
    const { t, collectUrl } = this.props

    return (
      <Hero>
        <Title>{t('Onboarding.title')}</Title>
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
            <Icon color={palette['dodger-blue']} icon={cozy} />
            <Subtitle>{t('Onboarding.cozy-assistant.title')}</Subtitle>
            <Paragraph>{t('Onboarding.cozy-assistant.description')}</Paragraph>
          </Section>
        </Sections>
        <CTA>
          <Button theme='regular' onClick={openCollect(collectUrl)}>
            {t('Onboarding.connect-bank-account')}
          </Button>
        </CTA>
      </Hero>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  fetchApps: () => dispatch(findApps())
})

const mapStateToProps = state => ({
  collectUrl: getUrlBySource(state, 'github.com/cozy/cozy-collect')
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  translate()
)(Onboarding)
