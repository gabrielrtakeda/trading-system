import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from 'material-ui/styles'
import TrendingDown from '@material-ui/icons/TrendingDown';

const styles = theme => ({
  icon: {
    fill: theme.palette.error.accent,
  },
  mono: {
    fill: theme.palette.type === 'dark' ?
      theme.palette.common.white :
      theme.palette.common.black,
  },
})

const ClassNames = ({ classes, monochrome, className }) => (
  <TrendingDown className={classNames(className, {
    [classes.icon]: !monochrome,
    [classes.mono]: monochrome
  })} />
)

ClassNames.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ClassNames)
