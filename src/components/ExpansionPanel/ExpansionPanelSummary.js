import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import { withStyles } from '@material-ui/core/styles'

export default withStyles(theme => ({
  root: {
    backgroundColor: 'var(--paleGrey)',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: theme.typography.pxToRem(14),
    // We want the min height to be the same no matter the expanded state
    minHeight: `${theme.typography.pxToRem(56)} !important`,
    padding: 0,
    color: 'var(--charcoalGrey)'
  },
  content: {
    // We want the margin to be the same no matter the expanded state
    margin: `${theme.typography.pxToRem(12)} 0 !important`,
    paddingLeft: theme.typography.pxToRem(36),
    paddingRight: theme.typography.pxToRem(8),
    '& > :last-child': {
      paddingRight: 0
    }
  },
  expanded: {},
  expandIcon: {
    left: theme.typography.pxToRem(6),
    right: 'auto',
    transform: 'translateY(-50%) rotate(-90deg)',
    '&$expanded': {
      transform: 'translateY(-50%) rotate(0)'
    }
  }
}))(ExpansionPanelSummary)
