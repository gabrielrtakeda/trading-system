import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import IconButton from 'material-ui/IconButton'
import AddIcon from '@material-ui/icons/Add'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import FlashOnIcon from '@material-ui/icons/FlashOn'
import Send from '@material-ui/icons/Send'
import Delete from '@material-ui/icons/Delete'
import ThumbUp from '@material-ui/icons/ThumbUp'
import ThumbDown from '@material-ui/icons/ThumbDown'
import ChangeHistory from '@material-ui/icons/ChangeHistory'
import Table, { TableBody, TableHead, TableRow } from 'material-ui/Table'
import Paper from 'material-ui/Paper'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Grid from 'material-ui/Grid'
import Drawer from 'material-ui/Drawer'
import Divider from 'material-ui/Divider'
import Modal from 'material-ui/Modal'
import Tooltip from 'material-ui/Tooltip'
import Switch from 'material-ui/Switch'
import TextField from 'material-ui/TextField'
import moment from 'moment'

import * as data from './data'
import currency from './currency'
import withRoot from '../withRoot'
import TableRowLoss from './TableRowLoss'
import TableRowGain from './TableRowGain'
import TableCell from './CustomTableCell'
import TrendingUp from './TrendingUp'
import TrendingDown from './TrendingDown'
import TrendingFlat from './TrendingFlat'
import { actions as ThemeActions } from '../redux/theme'
import { actions as TradesActions } from '../redux/trades'

const drawerWidth = 550

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
  menuTitle: {
    flex: 1,
    // marginLeft: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 700,
  },
  row: {
    backgroundColor: theme.palette.background.default,
  },
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
  tableTitle: {
    marginBottom: 16
  },
  spacer: {
    flex: '1 1 100%',
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    left: theme.spacing.unit * 2,
    zIndex: theme.zIndex.drawer + 1,
  },
  toolbar: theme.mixins.toolbar,
  modalPaper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  backdrop: {
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    // Remove grey highlight
    WebkitTapHighlightColor: 'transparent',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawerPaper: {
    position: 'relative',
    color: theme.palette.common.white,
    zIndex: theme.zIndex.modal + 1,
    overflow: 'inherit',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  appBarShift: {
    marginRight: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0, // So the Typography noWrap works
    position: 'relative', // So the Typography noWrap works
    overflowX: 'hidden',
    overflowY: 'auto',
    maxHeight: '100vh',
    marginRight: -drawerWidth,
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
  hide: {
    display: 'none',
  },
  formContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  actionButtons: {
    marginTop: theme.spacing.unit * 3,
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
    backgroundColor: `rgba(${theme.type === 'dark' ? '255,255,255' : '0,0,0'}, .08)`,
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
    const { classes, theme, darkMode, trades } = this.props
    const { openModal, openDrawer } = this.state

    return (
      <div className={classes.root}>
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: openDrawer
          })}
        >
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.menuTitle}>
              Trading System
            </Typography>
            <Tooltip id="tooltip-darkmode" title="Dark Mode">
              <Switch
                checked={darkMode}
                onChange={() => this.props.toggleTheme()}
                value="darkMode"
              />
            </Tooltip>
            <Tooltip
              id="tooltip-simulations"
              title="Simulations"
            >
              <IconButton
                className={classNames(openDrawer && classes.hide)}
                aria-owns={openDrawer ? 'menu-appbar' : null}
                aria-haspopup="true"
                onClick={this.handleDrawerOpen}
                color="inherit"
              >
                <FlashOnIcon />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>

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
                  <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                      <Typography className={classes.cardTitle} color="textSecondary">
                        Data de hoje
                      </Typography>
                      <Typography variant="headline" component="h2">
                        {moment().format('DD/MM/YYYY')}
                      </Typography>
                      <Typography color="textSecondary">
                        {moment().format('dddd')}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Iniciar trade</Button>
                    </CardActions>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                      <Typography className={classes.cardTitle} color="textSecondary">
                        Banca Inicial
                      </Typography>
                      <Typography variant="headline" component="h2">
                        $ 10,000.00
                      </Typography>
                      <Typography color="textSecondary">
                        Valor Fixo
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Editar valor</Button>
                    </CardActions>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                      <Typography className={classes.cardTitle} color="textSecondary">
                        Percentual de Risco
                      </Typography>
                      <Typography variant="headline" component="h2">
                        6% por dia
                      </Typography>
                      <Typography color="textSecondary">
                        3 tentativas
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Editar valores</Button>
                    </CardActions>
                  </Card>
                </Grid>
              </Grid>
              <Grid container spacing={24} justify='center'>
                <Grid item xs={4}>
                  <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                      <Typography className={classes.cardTitle} color="textSecondary">
                        Banca Atualizada
                      </Typography>
                      <Typography variant="headline" component="h2">
                        $ 33,001.83
                        {' '}<TrendingUp />
                      </Typography>
                      <Typography color="textSecondary">
                        Dinâmico
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                      <Typography className={classes.cardTitle} color="textSecondary">
                        Ganhos/Perdas
                      </Typography>
                      <Typography variant="headline" component="h2">
                        $ 13,729.63
                        {' '}<TrendingDown />
                      </Typography>
                      <Typography color="textSecondary">
                        Positivo
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={4}>
                  <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                      <Typography className={classes.cardTitle} color="textSecondary">
                        Alavancagem
                      </Typography>
                      <Typography variant="headline" component="h2">
                        71,24%
                        {' '}<TrendingFlat />
                      </Typography>
                      <Typography color="textSecondary">
                        Positivo
                      </Typography>
                    </CardContent>
                  </Card>
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
                          <TableCell numeric>% O.P</TableCell>
                          <TableCell numeric>Investimento</TableCell>
                          <TableCell numeric>Lucro O.P</TableCell>
                          <TableCell numeric>L/Meio</TableCell>
                          <TableCell className={classes.center}>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {trades.sort((a, b) => b.updatedAt - a.updatedAt).map(n => {
                          let TableRowColored = TableRow
                          let StatusIcon = props => (
                            <React.Fragment>
                              <Tooltip id={`tooltip-gain-${n.id}`} title="Gain">
                                <Button
                                  className={classes.cellButton}
                                  onClick={() => this.props.changeTradeStatus(n.id, 'gain')}
                                >
                                  <ThumbUp {...props} />
                                </Button>
                              </Tooltip>
                              <Tooltip id={`tooltip-loss-${n.id}`} title="Loss">
                                <Button
                                  className={classes.cellButton}
                                  onClick={() => this.props.changeTradeStatus(n.id, 'loss')}
                                >
                                  <ThumbDown {...props} />
                                </Button>
                              </Tooltip>
                              <Tooltip id={`tooltip-doji-${n.id}`} title="Doji">
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
                              <TableCell numeric>{currency.format(n.retainGain)}</TableCell>
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

          <Button
            variant="fab"
            className={classes.fab}
            color='secondary'
            onClick={this.handleModalOpen}
          >
            <AddIcon style={{ fill: theme.palette.common.white }} />
          </Button>
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
                      <TableCell numeric>% O.P</TableCell>
                      <TableCell numeric>Investimento</TableCell>
                      <TableCell numeric>Lucro</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.simulations(81).map((n, i) => {
                      return (
                        <TableRow className={classes.row} key={i} hover>
                          <TableCell numeric>{i + 1}</TableCell>
                          <TableCell numeric>{n.perc}%</TableCell>
                          <TableCell numeric style={inlineStyles.cellHighlight(theme)}>
                            {currency.format(n.invest)}
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
        </Drawer>

        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={openModal}
          onClose={this.handleModalClose}
          BackdropProps={{ classes: { root: classes.backdrop } }}
          disableAutoFocus
        >
          <div style={inlineStyles.modal} className={classes.modalPaper}>
            <Typography variant="title" id="modal-title">
              Cadastro de operação
            </Typography>
            <Typography variant="subheading" id="simple-modal-description">
              Informe os dados para cadastro de uma nova operação.
            </Typography>
            <form className={classes.formContainer}>
              <TextField
                fullWidth
                margin="normal"
                label="Ativo"
                id="asset"
                className={classes.textField}
                helperText="Ativo utilizado para a operação."
              />
              <TextField
                fullWidth
                margin="normal"
                label="Rendimento"
                id="income-percentual"
                className={classes.textField}
                helperText="Porcentagem de rendimento do ativo."
              />
              <TextField
                fullWidth
                margin="normal"
                label="Investimento"
                id="investiment"
                className={classes.textField}
                helperText="Valor a ser investido na operação."
              />
              <Grid container justify='space-between' className={classes.actionButtons}>
                <Grid item>
                  <Button
                    className={classes.button}
                    variant="raised"
                    color="primary"
                    onClick={this.handleModalClose}
                  >
                    Cancel
                    <Delete className={classes.rightIcon} />
                  </Button>
                </Grid>
                <Grid item>
                  <Button className={classes.button} variant="raised" color="secondary" type='submit'>
                    Send
                    <Send className={classes.rightIcon} />
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </Modal>
      </div>
    )
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  darkMode: state.theme.darkMode,
  trades: state.trades,
})

const mapDispatchToProps = {
  ...ThemeActions,
  ...TradesActions,
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withRoot(withStyles(styles, { withTheme: true })(Index))
)
