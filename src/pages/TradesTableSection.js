import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import Table, { TableBody, TableHead, TableRow } from 'material-ui/Table'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Tooltip from 'material-ui/Tooltip'
import ThumbUp from '@material-ui/icons/ThumbUp'
import ThumbDown from '@material-ui/icons/ThumbDown'
import ChangeHistory from '@material-ui/icons/ChangeHistory'

import currency from './currency'
import TableCell from './CustomTableCell'
import TableRowLoss from './TableRowLoss'
import TableRowGain from './TableRowGain'
import TrendingUp from './TrendingUp'
import TrendingDown from './TrendingDown'
import TrendingFlat from './TrendingFlat'
import { actions as TradesActions } from '../redux/trades'

const styles = theme => ({
  tableTitle: {
    marginBottom: 16
  },
  table: {
    minWidth: 700,
  },
  center: {
    textAlign: 'center',
  },
  cellButton: {
    minWidth: 0,
    padding: theme.spacing.unit,
  },
  icon: {
    paddingLeft: theme.spacing.unit / 2,
    paddingRight: theme.spacing.unit / 2,
  },
})

const TradesTableSection = ({ classes, xs, trades, changeTradeStatus }) => (
  <Grid item xs={xs}>
    <Grid container spacing={24} justify='flex-start'>
      <Grid item xs={12}>
        <div className={classes.tableTitle}>
          <Typography variant="title">
            Operações
          </Typography>
        </div>
        <Paper>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell numeric>Mão</TableCell>
                <TableCell>Ativo</TableCell>
                <TableCell numeric>Rendimento</TableCell>
                <TableCell numeric>Investimento</TableCell>
                <TableCell numeric>Lucro</TableCell>
                <TableCell className={classes.center}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {trades.sort((a, b) => b.updatedAt - a.updatedAt).map(n => {
                let TableRowColored = TableRow
                let StatusIcon = props => (
                  <React.Fragment>
                    <Tooltip id={`tooltip-gain-${n.id}`} title="Gain" placement="top">
                      <Button
                        className={classes.cellButton}
                        onClick={() => changeTradeStatus(n.id, 'gain')}
                      >
                        <ThumbUp {...props} />
                      </Button>
                    </Tooltip>
                    <Tooltip id={`tooltip-loss-${n.id}`} title="Loss" placement="top">
                      <Button
                        className={classes.cellButton}
                        onClick={() => changeTradeStatus(n.id, 'loss')}
                      >
                        <ThumbDown {...props} />
                      </Button>
                    </Tooltip>
                    <Tooltip id={`tooltip-doji-${n.id}`} title="Doji" placement="top">
                      <Button
                        className={classes.cellButton}
                        onClick={() => changeTradeStatus(n.id, 'doji')}
                      >
                        <ChangeHistory {...props} />
                      </Button>
                    </Tooltip>
                  </React.Fragment>
                )
                if (n.status === 'gain') {
                  TableRowColored = TableRowGain
                  StatusIcon = TrendingUp
                }
                if (n.status === 'loss') {
                  TableRowColored = TableRowLoss
                  StatusIcon = TrendingDown
                }
                if (n.status === 'doji') {
                  StatusIcon = TrendingFlat
                }

                return (
                  <TableRowColored key={n.id} hover>
                    <TableCell numeric>{n.hand}</TableCell>
                    <TableCell>{n.asset}</TableCell>
                    <TableCell numeric>{n.incomePercentual * 100}%</TableCell>
                    <TableCell numeric>{currency.format(n.investiment)}</TableCell>
                    <TableCell numeric>{currency.format(n.gain)}</TableCell>
                    <TableCell className={classes.center}>
                      <StatusIcon monochrome='true' className={classes.icon} />
                    </TableCell>
                  </TableRowColored>
                )
              })}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </Grid>
  </Grid>
)

TradesTableSection.defaultProps = {
  xs: 12
}

const mapStateToProps = state => ({
  trades: state.trades,
})

export default connect(mapStateToProps, TradesActions)(
  withStyles(styles)(TradesTableSection)
)
