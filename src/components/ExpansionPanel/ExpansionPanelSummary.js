import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import { withStyles } from '@material-ui/core/styles'

export default withStyles(() => ({
  root: {
    backgroundColor: 'var(--paleGrey)',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: '14px',
    // We want the min height to be the same no matter the expanded state
    minHeight: '56px !important',
    padding: '0',
    color: 'var(--charcoalGrey)'
  },
  content: {
    // We want the margin to be the same no matter the expanded state
    margin: '12px 0 !important',
    paddingLeft: '36px',
    paddingRight: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    flex: '1'
  },
  expandIcon: {
    left: '6px',
    right: 'auto'
  }
}))(ExpansionPanelSummary)
