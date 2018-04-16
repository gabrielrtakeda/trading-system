import { withStyles } from 'material-ui/styles'
import { TableRow } from 'material-ui/Table'

export default withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.contrastText,
  },
  hover: {
    '&$hover:hover': {
      backgroundColor: theme.palette.success.light
    },
  },
}))(TableRow)
