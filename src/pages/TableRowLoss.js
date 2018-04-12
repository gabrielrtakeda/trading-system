import React from 'react'
import { withStyles } from 'material-ui/styles'
import { TableRow } from 'material-ui/Table'

export default withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
  },
}))(TableRow)
