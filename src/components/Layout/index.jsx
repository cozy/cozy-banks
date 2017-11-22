import styles from './Layout.styl'
import mkComponent from 'utils/mkComponent'

/**
 * `Layout`, `Content`, `Sidebar` are building blocks
 * to create a responsive design.
 *
 * - `Sidebar` is a left-pane on desktop and collapses to
 *   the bottom on mobile
 * - `Content` adds sane padding for desktop/mobile
 *
 */
export const Content = mkComponent('main', {className: styles['c-content']})
export const Layout = mkComponent('div', {className: styles['c-layout']})
export const Sidebar = mkComponent('aside', {className: styles['c-sidebar']})
