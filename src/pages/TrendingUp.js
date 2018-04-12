import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import TrendingUp from '@material-ui/icons/TrendingUp'

const styles = theme => ({
  icon: {
    fill: theme.palette.secondary.main,
  },
})

const ClassNames = ({ classes }) => (
  <TrendingUp className={classes.icon} />
)

ClassNames.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ClassNames)
