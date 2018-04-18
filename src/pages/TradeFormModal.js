/* eslint-disable react/jsx-no-duplicate-props */
import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import { InputAdornment } from 'material-ui/Input'
import Modal from 'material-ui/Modal'
import Typography from 'material-ui/Typography'
import TextField from 'material-ui/TextField'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import Delete from '@material-ui/icons/Delete'
import Send from '@material-ui/icons/Send'

import Autocomplete from './Autocomplete'
import { actions as TradesActions } from '../redux/trades'

const styles = theme => ({
  actionButtons: {
    marginTop: theme.spacing.unit * 3,
  },
  backdrop: {
    width: '100%',
    height: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    WebkitTapHighlightColor: 'transparent',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  formContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  modalPaper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
})

const inlineStyles = {
  modal: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
}

class TradeFormModal extends React.Component {
  state = {
    trade: {
      asset: undefined,
      incomePercentual: undefined,
      investiment: undefined,
    },
  }

  handleChange = name => value => {
    this.setState({
      trade: {
        ...this.state.trade,
        [name]: value,
      }
    })
  }

  render () {
    const { classes, open, onClose, addTrade } = this.props

    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={onClose}
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

          <form
            className={classes.formContainer}
            onSubmit={e => {
              e.preventDefault()
              addTrade(this.state.trade)
              onClose()
            }}
          >
            <Autocomplete
              fullWidth
              label="Ativo"
              helperText="Ativo utilizado para a operação."
              onChange={this.handleChange('asset')}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Rendimento"
              id="income-percentual"
              className={classes.textField}
              helperText="Porcentagem de rendimento do ativo."
              type="number"
              onChange={e => this.handleChange('incomePercentual')(Number(e.target.value) / 100)}
              inputProps={{
                step: "1",
                min: "0",
                max: "100",
              }}
              InputProps={{
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Investimento"
              id="investiment"
              className={classes.textField}
              helperText="Valor a ser investido na operação."
              type='number'
              onChange={e => this.handleChange('investiment')(Number(e.target.value))}
              inputProps={{
                step: "0.01"
              }}
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />
            <Grid container justify='space-between' className={classes.actionButtons}>
              <Grid item>
                <Button variant="raised" color="primary" onClick={onClose}>
                  Cancel
                  <Delete className={classes.rightIcon} />
                </Button>
              </Grid>
              <Grid item>
                <Button variant="raised" color="secondary" type='submit'>
                  Send
                  <Send className={classes.rightIcon} />
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Modal>
    )
  }
}

export default connect(undefined, TradesActions)(withStyles(styles)(TradeFormModal))
