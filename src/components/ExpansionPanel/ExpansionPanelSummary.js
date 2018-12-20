import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import { withStyles } from '@material-ui/core/styles'

export default withStyles(() => ({
  root: {
    backgroundColor: '#f5f6f7',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    // Had to !important it instead of using `expanded` class because it's applied to both `root` and `content` when `expanded=true`
    minHeight: '48px !important',
    padding: '0'
  },
  content: {
    // Added !important because I don't know how to select `content` only when `expanded=true`
    margin: '12px 0 !important',
    paddingLeft: '36px'
  },
  expandIcon: {
    left: '0',
    right: 'auto'
  }
}))(ExpansionPanelSummary)
