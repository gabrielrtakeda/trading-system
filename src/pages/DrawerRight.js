import React from 'react'
import { withStyles } from 'material-ui/styles'
import Drawer from 'material-ui/Drawer'
import IconButton from 'material-ui/IconButton'
import Divider from 'material-ui/Divider'
import Grid from 'material-ui/Grid'
import Typography from 'material-ui/Typography'
import Paper from 'material-ui/Paper'
import Table, { TableBody, TableHead, TableRow } from 'material-ui/Table'
import Tooltip from 'material-ui/Tooltip'
import Button from 'material-ui/Button'
import AddIcon from '@material-ui/icons/Add'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

import simulation from '../services/simulation'
import currency from './currency'
import TableCell from './CustomTableCell'
import { TradeContext } from './TradeContext'

const styles = theme => ({
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
  simulationSection: {
    padding: theme.spacing.unit * 2,
  },
  tableTitle: {
    marginBottom: theme.spacing.unit * 2,
  },
  row: {
    backgroundColor: theme.palette.background.default,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    left: -(theme.spacing.unit * 9),
    zIndex: theme.zIndex.drawer + 1,
  },
})

const inlineStyles = {
  cellHighlight: theme => ({
    backgroundColor: theme.palette.type === 'dark' ?
      'rgba(255, 255, 255, .08)' :
      'rgba(0, 0, 0, .025)',
    textAlign: 'right',
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
  }),
}

const DrawerRight = ({ classes, open, onDrawerClose, onModalOpen, setModalValues, theme }) => (
  <Drawer
    variant="persistent"
    anchor='right'
    open={open}
    classes={{ paper: classes.drawerPaper }}
  >
    <div className={classes.drawerHeader}>
      <IconButton onClick={onDrawerClose}>
        <ChevronRightIcon />
      </IconButton>
    </div>
    <Divider />
    <Grid item>
      <div className={classes.simulationSection}>
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
              <TradeContext.Consumer>
                {({ setTrade }) => simulation(19, 0.80, 385.44).map((n, i) => (
                  <TableRow
                    hover
                    key={i}
                    className={classes.row}
                    onClick={() => {
                      setTrade({
                        investiment: n.investiment,
                        incomePercentual: 0.80
                      })
                      onModalOpen()
                    }}
                  >
                    <TableCell numeric>{i + 1}</TableCell>
                    <TableCell numeric>{0.80 * 100}%</TableCell>
                    <TableCell numeric style={inlineStyles.cellHighlight(theme)}>
                      {currency.format(n.investiment)}
                    </TableCell>
                    <TableCell numeric>{currency.format(n.gain)}</TableCell>
                  </TableRow>
                ))}
              </TradeContext.Consumer>
            </TableBody>
          </Table>
        </Paper>
      </div>
    </Grid>

    <Tooltip id="tooltip-fab" title="Adicionar Operação" placement="left">
      <TradeContext.Consumer>
        {({ setTrade }) => (
          <Button
            variant="fab"
            className={classes.fab}
            color='secondary'
            onClick={() => {
              setTrade({
                incomePercentual: 0,
                investiment: 0,
              })
              onModalOpen()
            }}
          >
            <AddIcon style={{ fill: theme.palette.common.white }} />
          </Button>
        )}
      </TradeContext.Consumer>
    </Tooltip>
  </Drawer>
)

export default withStyles(styles, { withTheme: true })(DrawerRight)
