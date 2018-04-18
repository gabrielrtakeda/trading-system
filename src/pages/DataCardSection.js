import React from 'react'
import uuid from 'uuid'
import moment from 'moment'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import DataCard from './DataCard'

const DataCardSection = ({ xs }) => (
  <Grid item xs={xs}>
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
  </Grid>
)

DataCardSection.defaultProps = {
  xs: 12,
}

export default DataCardSection
