import React from 'react'
import { withStyles } from 'material-ui/styles'
import { TableRow } from 'material-ui/Table'

export default withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
}))(TableRow)
