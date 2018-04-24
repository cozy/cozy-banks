import React from 'react'
import { Icon as BaseIcon } from 'cozy-ui/react'
import styles from './Hero.styl'
import mkComponent from 'utils/mkComponent'

export const Icon = ({ color, icon }) => (
  <BaseIcon width="auto" height="5rem" style={{ color }} icon={icon} />
)

export const Hero = mkComponent('div', { className: styles.Hero })
export const Title = mkComponent('h2', { className: styles.Hero__title })
export const Subtitle = mkComponent('h3', { className: styles.Hero__subtitle })
export const Section = mkComponent('div', { className: styles.Hero__section })
export const Sections = mkComponent('div', { className: styles.Hero__sections })
export const Paragraph = mkComponent('p', {})
export const CTA = mkComponent('p', { className: styles.Hero__cta })
