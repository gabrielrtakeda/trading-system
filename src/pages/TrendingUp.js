import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { withStyles } from 'material-ui/styles'
import TrendingUp from '@material-ui/icons/TrendingUp'

const styles = theme => ({
  icon: {
    fill: theme.palette.success.accent,
  },
  mono: {
    fill: theme.palette.type === 'dark' ?
      theme.palette.common.white :
      theme.palette.common.black,
  },
})

const ClassNames = ({ classes, monochrome, className }) => (
  <TrendingUp className={classNames(className, {
    [classes.icon]: !monochrome,
    [classes.mono]: monochrome
  })} />
)

ClassNames.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ClassNames)
