import { withStyles } from 'material-ui/styles'
import { TableRow } from 'material-ui/Table'

export default withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
  },
  hover: {
    '&$hover:hover': {
      backgroundColor: theme.palette.type === 'dark' ?
        theme.palette.error.light :
        theme.palette.error.dark
    },
  },
}))(TableRow)
