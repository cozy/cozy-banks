import Switch from '@material-ui/core/Switch'
import { withStyles } from '@material-ui/core/styles'

const disabledStyle = {
  '&$switchBase': {
    color: 'white',
    '& + $bar': {
      backgroundColor: 'var(--silver)',
      opacity: 1
    }
  }
}

export default withStyles(() => ({
  root: {},
  switchBase: {},
  checked: {
    '& + $bar': {
      opacity: 1
    }
  },
  icon: {
    width: 16,
    height: 16
  },
  bar: {
    width: 25,
    height: 12,
    marginTop: -6,
    marginLeft: -12,
    backgroundColor: 'var(--silver)',
    opacity: 1
  },
  colorPrimary: {
    '&$checked': {
      color: 'white'
    }
  },
  colorSecondary: {
    '&$checked': {
      color: 'white'
    }
  },
  colorDisabled: disabledStyle,
  disabled: disabledStyle
}))(Switch)
