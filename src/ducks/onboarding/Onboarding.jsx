import React from 'react'
import { translate, Button, Icon } from 'cozy-ui/react'

import calculator from 'assets/icons/icon-calculator.svg'
import watch from 'assets/icons/icon-watch.svg'
import cozy from 'assets/icons/icon-cozy.svg'
import styles from './Onboarding.styl'
import flash from 'ducks/flash'

const RED = '#f52d2d'
const PURPLE = '#a75bcb'
const BLUE = '#2d8af2'

const BigIcon = ({ color, icon }) => (
  <Icon width='auto' height='6rem' style={{ color }} icon={icon} />
)

const Onboarding = ({t}) => (
  <div className={styles.Onboarding}>
    <h2>{t('Onboarding.title')}</h2>
    <div className={styles.Onboarding__sections}>
      <div className={styles.Onboarding__section}>
        <BigIcon color={RED} icon={calculator} />
        <h3>{t('Onboarding.manage-budget.title')}</h3>
        <p>{t('Onboarding.manage-budget.description')}</p>
      </div>
      <div className={styles.Onboarding__section}>
        <BigIcon color={PURPLE} icon={watch} />
        <h3>{t('Onboarding.save-time.title')}</h3>
        <p>{t('Onboarding.save-time.description')}</p>
      </div>
      <div className={styles.Onboarding__section}>
        <BigIcon color={BLUE} icon={cozy} />
        <h3>{t('Onboarding.cozy-assistant.title')}</h3>
        <p>{t('Onboarding.cozy-assistant.description')}</p>
      </div>
    </div>
    <p className={styles.Onboarding__connect}>
      <Button theme='regular' onClick={() => flash(t('ComingSoon.description'))}>
        {t('Onboarding.connect-bank-account')}
      </Button>
    </p>
  </div>
)

export default translate()(Onboarding)
