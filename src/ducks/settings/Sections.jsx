import React from 'react'
import { Title } from 'cozy-ui/react/Text'
import styles from 'ducks/settings/TogglePane.styl'
import { ToggleRowTitle, ToggleRowWrapper } from 'ducks/settings/ToggleRow'

const TogglePaneTitle = ({ children }) => (
  <Title className={styles.TogglePaneTitle}>{children}</Title>
)
const TogglePaneDescription = ({ children }) => (
  <p className="u-coolGrey">{children}</p>
)
const TogglePaneSubtitle = ({ children }) => (
  <h5 className={styles.TogglePaneSubtitle}>{children}</h5>
)

export const Section = ({ title, description, children }) => (
  <div className="u-pb-1-half">
    {title ? <TogglePaneTitle>{title}</TogglePaneTitle> : null}
    {description ? (
      <TogglePaneDescription>{description}</TogglePaneDescription>
    ) : null}
    {children}
  </div>
)

export const SubSection = ({ children, title, description }) => (
  <ToggleRowWrapper>
    {title ? <ToggleRowTitle>{title}</ToggleRowTitle> : null}

    {description ? (
      <TogglePaneDescription>{description}</TogglePaneDescription>
    ) : null}
    {children}
  </ToggleRowWrapper>
)
