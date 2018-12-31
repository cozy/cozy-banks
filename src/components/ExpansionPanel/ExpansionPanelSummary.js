import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import { withStyles } from '@material-ui/core/styles'

export default withStyles(() => ({
  root: {
    backgroundColor: 'var(--paleGrey)',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: '14px',
    // Had to !important it instead of using `expanded` class because it's applied to both `root` and `content` when `expanded=true`
    minHeight: '56px !important',
    padding: '0',
    color: 'var(--charcoalGrey)'
  },
  content: {
    // Added !important because I don't know how to select `content` only when `expanded=true`
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
