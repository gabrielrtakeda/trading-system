import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import ThumbUp from '@material-ui/icons/ThumbUp'
import ThumbDown from '@material-ui/icons/ThumbDown'
import ChangeHistory from '@material-ui/icons/ChangeHistory'
import Table, { TableBody, TableHead, TableRow } from 'material-ui/Table'
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'
import Tooltip from 'material-ui/Tooltip'

import { actions as TradesActions } from '../redux/trades'
import currency from './currency'
import withRoot from '../withRoot'
import TableRowLoss from './TableRowLoss'
import TableRowGain from './TableRowGain'
import TableCell from './CustomTableCell'
import TrendingUp from './TrendingUp'
import TrendingDown from './TrendingDown'
import TrendingFlat from './TrendingFlat'
import TradeFormModal from './TradeFormModal'
import DataCard from './DataCard'
import AppBar from './AppBar'
import DrawerRight from './DrawerRight'
import DataCardSection from './DataCardSection'

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  table: {
    minWidth: 700,
  },
  tableTitle: {
    marginBottom: 16
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0,
    position: 'relative',
    overflowX: 'hidden',
    overflowY: 'auto',
    maxHeight: '100vh',
    marginRight: -theme.spacing.drawerWidth,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: {
    marginRight: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  contentContainer: {
    paddingBottom: theme.spacing.unit * 8,
  },
  icon: {
    paddingLeft: theme.spacing.unit / 2,
    paddingRight: theme.spacing.unit / 2,
  },
  cellButton: {
    minWidth: 0,
    padding: theme.spacing.unit,
  },
  center: {
    textAlign: 'center',
  },
})

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openModal: false,
      openDrawer: true,
    }
  }

  handleModalClose = () => this.setState({ openModal: false })
  handleModalOpen = () => this.setState({ openModal: true })
  handleDrawerClose = () => this.setState({ openDrawer: false })
  handleDrawerOpen = () => this.setState({ openDrawer: true })

  render() {
    const { classes, trades } = this.props
    const { openModal, openDrawer } = this.state

    return (
      <div className={classes.root}>
        <AppBar
          title='Trading System'
          open={openDrawer}
          onDrawerOpen={this.handleDrawerOpen}
        />

        <main
          className={classNames(classes.content, {
            [classes.contentShift]: openDrawer,
          })}
        >
          <div className={classes.toolbar} />
          <Grid className={classes.contentContainer} container spacing={24}>
            <DataCardSection />

            <Grid item xs={12}>
              <Grid container spacing={24} justify='center'>
                <Grid item xs={4}>
                  <DataCard
                    label='Banca Atualizada'
                    content='$ 33,001.83'
                    Icon={TrendingUp}
                    help='Dinâmico'
                  />
                </Grid>
                <Grid item xs={4}>
                  <DataCard
                    label='Ganhos/Perdas'
                    content='$ 13,729.63'
                    Icon={TrendingDown}
                    help='Positivo'
                  />
                </Grid>
                <Grid item xs={4}>
                  <DataCard
                    label='Alavancagem'
                    content='71,24%'
                    Icon={TrendingFlat}
                    help='Positivo'
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
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
                                  onClick={() => this.props.changeTradeStatus(n.id, 'gain')}
                                >
                                  <ThumbUp {...props} />
                                </Button>
                              </Tooltip>
                              <Tooltip id={`tooltip-loss-${n.id}`} title="Loss" placement="top">
                                <Button
                                  className={classes.cellButton}
                                  onClick={() => this.props.changeTradeStatus(n.id, 'loss')}
                                >
                                  <ThumbDown {...props} />
                                </Button>
                              </Tooltip>
                              <Tooltip id={`tooltip-doji-${n.id}`} title="Doji" placement="top">
                                <Button
                                  className={classes.cellButton}
                                  onClick={() => this.props.changeTradeStatus(n.id, 'doji')}
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
          </Grid>
        </main>

        <DrawerRight
          open={openDrawer}
          onDrawerClose={this.handleDrawerClose}
          onModalOpen={this.handleModalOpen}
        />

        <TradeFormModal
          open={openModal}
          onClose={this.handleModalClose}
        />
      </div>
    )
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  trades: state.trades,
})

const mapDispatchToProps = {
  ...TradesActions,
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withRoot(withStyles(styles)(Index))
)
