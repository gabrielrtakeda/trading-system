import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import uuid from 'uuid'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import AddIcon from '@material-ui/icons/Add'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ThumbUp from '@material-ui/icons/ThumbUp'
import ThumbDown from '@material-ui/icons/ThumbDown'
import ChangeHistory from '@material-ui/icons/ChangeHistory'
import Table, { TableBody, TableHead, TableRow } from 'material-ui/Table'
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid'
import Drawer from 'material-ui/Drawer'
import Divider from 'material-ui/Divider'
import Tooltip from 'material-ui/Tooltip'
import moment from 'moment'

import simulation from '../services/simulation'
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

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  padding: {
    padding: 16
  },
  table: {
    minWidth: 700,
  },
  row: {
    backgroundColor: theme.palette.background.default,
  },
  tableTitle: {
    marginBottom: 16
  },
  spacer: {
    flex: '1 1 100%',
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    left: -(theme.spacing.unit * 9),
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    position: 'relative',
    color: theme.palette.common.white,
    zIndex: theme.zIndex.modal + 1,
    overflow: 'inherit',
    width: theme.spacing.drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
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

const inlineStyles = {
  modal: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  cellHighlight: theme => ({
    backgroundColor: theme.palette.type === 'dark' ?
      'rgba(255, 255, 255, .08)' :
      'rgba(0, 0, 0, .025)',
    textAlign: 'right',
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
  }),
}

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
    const { classes, theme, trades } = this.props
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
            <Grid item xs={12}>
              <Grid container spacing={24} justify='center'>
                <Grid item xs={4}>
                  <DataCard
                    label='Data de hoje'
                    content={moment().format('DD/MM/YYYY')}
                    help={moment().format('dddd')}
                    ActionButtons={[
                      <Button key={uuid()} size="small">Iniciar trade</Button>
                    ]}
                  />
                </Grid>
                <Grid item xs={4}>
                  <DataCard
                    label='Banca Inicial'
                    content={'$ 10,000.00'}
                    help='Valor Fixo'
                    ActionButtons={[
                      <Button key={uuid()} size="small">Editar valor</Button>
                    ]}
                  />
                </Grid>
                <Grid item xs={4}>
                  <DataCard
                    label='Percentual de Risco'
                    content='6% por dia'
                    help='3 tentativas'
                    ActionButtons={[
                      <Button key={uuid()} size="small">Editar valores</Button>
                    ]}
                  />
                </Grid>
              </Grid>

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

        <Drawer
          variant="persistent"
          anchor='right'
          open={openDrawer}
          classes={{ paper: classes.drawerPaper }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronRightIcon />
            </IconButton>
          </div>
          <Divider />
          <Grid item>
            <div className={classes.padding}>
              <div className={classes.tableTitle}>
                <Typography variant="title">
                  Simulação
                </Typography>
              </div>
              <Paper>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell numeric>Mão</TableCell>
                      <TableCell numeric>Rendimento</TableCell>
                      <TableCell numeric>Investimento</TableCell>
                      <TableCell numeric>Lucro</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {simulation(19, 0.80, 385.44).map((n, i) => {
                      return (
                        <TableRow className={classes.row} key={i} hover>
                          <TableCell numeric>{i + 1}</TableCell>
                          <TableCell numeric>{0.80 * 100}%</TableCell>
                          <TableCell numeric style={inlineStyles.cellHighlight(theme)}>
                            {currency.format(n.investiment)}
                          </TableCell>
                          <TableCell numeric>{currency.format(n.gain)}</TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </Paper>
            </div>
          </Grid>

          <Tooltip id="tooltip-fab" title="Adicionar Operação" placement="left">
            <Button
              variant="fab"
              className={classes.fab}
              color='secondary'
              onClick={this.handleModalOpen}
            >
              <AddIcon style={{ fill: theme.palette.common.white }} />
            </Button>
          </Tooltip>
        </Drawer>

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
  withRoot(withStyles(styles, { withTheme: true })(Index))
)
