import styles from './Layout.styl'
import mkComponent from 'utils/mkComponent'

export const Content = mkComponent('main', {className: styles['coz-content']})
export const Layout = mkComponent('div', {className: styles['coz-layout']})
export const Sidebar = mkComponent('aside', {className: styles['coz-sidebar']})
