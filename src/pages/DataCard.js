import React from 'react'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Card, { CardActions, CardContent } from 'material-ui/Card'

const styles = theme => ({
  card: {
    minWidth: 180,
  },
  cardContent: {
    minHeight: 120
  },
  cardTitle: {
    marginBottom: 16,
    fontSize: 14,
  },
})

const DataCard = ({ classes, label, content, help, Icon, ActionButtons }) => (
  <Card className={classes.card}>
    <CardContent className={classes.cardContent}>
      <Typography className={classes.cardTitle} color="textSecondary">
        {label}
      </Typography>
      <Typography variant="headline" component="h2">
        {content}{' '}
        {Icon && <Icon />}
      </Typography>
      <Typography color="textSecondary">
        {help}
      </Typography>
    </CardContent>
    {ActionButtons && (
      <CardActions>
        {ActionButtons}
      </CardActions>
    )}
  </Card>
)

export default withStyles(styles)(DataCard)
