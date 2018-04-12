import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import TrendingFlat from '@material-ui/icons/TrendingFlat';

const styles = theme => ({
  icon: {
    fill: theme.palette.grey['500'],
  },
})

const ClassNames = ({ classes }) => (
  <TrendingFlat className={classes.icon} />
)

ClassNames.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ClassNames)
