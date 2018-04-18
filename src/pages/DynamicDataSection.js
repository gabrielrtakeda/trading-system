import React from 'react'
import { connect } from 'react-redux'
import Grid from 'material-ui/Grid'
import currency from './currency'
import DataCard from './DataCard'
import TrendingUp from './TrendingUp'
import TrendingDown from './TrendingDown'
import TrendingFlat from './TrendingFlat'

const sumFiltered = (trades, status) => trades
  .filter(t => t.status === status)
  .map(t => t.investiment * t.incomePercentual)
  .reduce((a, b) => a + b)

const DynamicDataSection = ({ xs, trades }) => {
  const amount = 10000
  const gainLoss = sumFiltered(trades, 'gain') - sumFiltered(trades, 'loss')
  const statusConditions = [
    { name: 'gain', status: gainLoss > 0 },
    { name: 'loss', status: gainLoss < 0 },
    { name: 'doji', status: gainLoss === 0 },
  ]
  const status = statusConditions.find(s => s.status === true).name
  const statusIcons = {
    gain: TrendingUp,
    loss: TrendingDown,
    doji: TrendingFlat,
  }
  const statusLabel = {
    gain: 'Positivo',
    loss: 'Negativo',
    doji: '-',
  }
  const leveragePercentual = parseFloat(gainLoss / 10000 * 100).toFixed(2)

  return (
    <Grid item xs={xs}>
      <Grid container spacing={24} justify='center'>
        <Grid item xs={4}>
          <DataCard
            label='Banca Atualizada'
            content={currency.format(amount + gainLoss)}
            Icon={statusIcons[status]}
            help='Dinâmico'
          />
        </Grid>
        <Grid item xs={4}>
          <DataCard
            label='Ganhos/Perdas'
            content={currency.format(gainLoss)}
            Icon={statusIcons[status]}
            help={statusLabel[status]}
          />
        </Grid>
        <Grid item xs={4}>
          <DataCard
            label='Alavancagem'
            content={`${leveragePercentual}%`}
            Icon={statusIcons[status]}
            help={statusLabel[status]}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}

DynamicDataSection.defaultProps = {
  xs: 12,
}

const mapStateToProps = state => ({
  trades: state.trades,
})

export default connect(mapStateToProps)(DynamicDataSection)
