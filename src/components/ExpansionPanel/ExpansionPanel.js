import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import { withStyles } from '@material-ui/core/styles'

export default withStyles(() => ({
  root: {
    // We want the border radius to be the same for all instances (no difference between first-child, last-child and others)
    borderRadius: '6px !important',
    boxShadow: 'none',
    border: '0.0625rem solid var(--silver)',
    overflow: 'hidden',
    marginBottom: '1rem'
  }
}))(ExpansionPanel)
