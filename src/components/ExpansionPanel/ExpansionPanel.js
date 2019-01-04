import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import { withStyles } from '@material-ui/core/styles'

export default withStyles(theme => ({
  root: {
    // We want the border radius to be the same for all instances (no difference between first-child, last-child and others)
    borderRadius: '6px !important',
    boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.08)',
    borderWidth: theme.typography.pxToRem(1),
    borderStyle: 'solid',
    borderColor: 'var(--silver)',
    overflow: 'hidden',
    marginBottom: theme.typography.pxToRem(16)
  }
}))(ExpansionPanel)
