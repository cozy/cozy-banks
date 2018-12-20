import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import { withStyles } from '@material-ui/core/styles'

export default withStyles(() => ({
  root: {
    // Added !important because no matter first/last-child, we want the border radius
    borderRadius: '10px !important',
    boxShadow: 'none',
    border: '1px solid #d5d5d5',
    overflow: 'hidden'
  }
}))(ExpansionPanel)
