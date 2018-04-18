import React from 'react'
import Grid from 'material-ui/Grid'
import DataCard from './DataCard'
import TrendingUp from './TrendingUp'
import TrendingDown from './TrendingDown'
import TrendingFlat from './TrendingFlat'

const DynamicDataSection = ({ xs }) => (
  <Grid item xs={xs}>
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
)

DynamicDataSection.defaultProps = {
  xs: 12,
}

export default DynamicDataSection
