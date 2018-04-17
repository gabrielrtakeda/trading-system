import grey from 'material-ui/colors/grey'
import { withStyles } from 'material-ui/styles'
import { TableCell } from 'material-ui/Table'

export default withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.type === 'dark' ?
      theme.palette.common.black :
      grey[300],
    color: theme.palette.type === 'dark' ?
      theme.palette.common.white :
      theme.palette.common.black,
  }
}))(TableCell)
