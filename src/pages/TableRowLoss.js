import React from 'react'
import { withStyles } from 'material-ui/styles'
import { TableRow } from 'material-ui/Table'
import purple from 'material-ui/colors/purple'

export default withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
  },
  hover: {
    '&$hover:hover': {
      backgroundColor: theme.palette.error.dark
    },
  },
}))(TableRow)
