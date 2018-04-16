import grey from 'material-ui/colors/grey'
import { withStyles } from 'material-ui/styles'
import { TableCell } from 'material-ui/Table'

export default withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.type === 'dark' ?
      theme.palette.common.black :
      grey[800],
    color: theme.palette.common.white,
  }
}))(TableCell)
