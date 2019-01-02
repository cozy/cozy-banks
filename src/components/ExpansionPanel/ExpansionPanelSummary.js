import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import { withStyles } from '@material-ui/core/styles'

export default withStyles(() => ({
  root: {
    backgroundColor: 'var(--paleGrey)',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: '0.875rem',
    // We want the min height to be the same no matter the expanded state
    minHeight: '3.5rem !important',
    padding: '0',
    color: 'var(--charcoalGrey)'
  },
  content: {
    // We want the margin to be the same no matter the expanded state
    margin: '0.75rem 0 !important',
    paddingLeft: '2.25rem',
    paddingRight: '0.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    flex: '1'
  },
  expandIcon: {
    left: '0.375rem',
    right: 'auto'
  }
}))(ExpansionPanelSummary)
