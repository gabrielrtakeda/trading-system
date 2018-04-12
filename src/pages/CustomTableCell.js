import React from 'react'
import { withStyles } from 'material-ui/styles'
import { TableCell } from 'material-ui/Table'

export default withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}))(TableCell)
