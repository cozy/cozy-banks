import React from 'react'
import { Icon as BaseIcon } from 'cozy-ui/react'
import styles from './Hero.styl'

export const Icon = ({ color, icon }) => (
  <BaseIcon width='auto' height='5rem' style={{ color }} icon={icon} />
)

const mkC = (Tag, extra = {}) => ({children, ...props}) => (
  <Tag {...extra} {...props}>{children}</Tag>
)

export const Hero = mkC('div', {className: styles.Hero})
export const Title = mkC('h2', {className: styles.Hero__title})
export const Subtitle = mkC('h3', {className: styles.Hero__subtitle})
export const Section = mkC('div', {className: styles.Hero__section})
export const Sections = mkC('div', {className: styles.Hero__sections})
export const Paragraph = mkC('p', {})
export const CTA = mkC('p', {className: styles.Hero__cta})
