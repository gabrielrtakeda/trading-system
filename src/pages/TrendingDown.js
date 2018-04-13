import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import TrendingDown from '@material-ui/icons/TrendingDown';

const styles = theme => ({
  icon: {
    fill: theme.palette.error.accent,
  },
})

const ClassNames = ({ classes }) => (
  <TrendingDown className={classes.icon} />
)

ClassNames.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ClassNames)
