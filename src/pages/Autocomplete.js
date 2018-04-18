import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Input from 'material-ui/Input'
import { MenuItem } from 'material-ui/Menu'
import { FormHelperText } from 'material-ui/Form'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import ClearIcon from '@material-ui/icons/Clear'
import Select from 'react-select'
import 'react-select/dist/react-select.css'

export const suggestions = [
  { label: 'AIG', value: 'AIG' },
  { label: 'Alibaba', value: 'Alibaba' },
  { label: 'Altaba', value: 'Altaba' },
  { label: 'Amazon', value: 'Amazon' },
  { label: 'Apple', value: 'Apple' },
  { label: 'Baidu', value: 'Baidu' },
  { label: 'Cisco System', value: 'Cisco System' },
  { label: 'CitiGroup', value: 'CitiGroup' },
  { label: 'Coca Cola', value: 'Coca Cola' },
  { label: 'DFMGI', value: 'DFMGI' },
  { label: 'Facebook', value: 'Facebook' },
  { label: 'Goldman Sachs', value: 'Goldman Sachs' },
  { label: 'Google', value: 'Google' },
  { label: 'Intel', value: 'Intel' },
  { label: 'JP Morgan Chase', value: 'JP Morgan Chase' },
  { label: 'MacDonalds', value: 'MacDonalds' },
  { label: 'Microsoft', value: 'Microsoft' },
  { label: 'Morgan Stanley', value: 'Morgan Stanley' },
  { label: 'Nike', value: 'Nike' },
  { label: 'Ouro', value: 'Ouro' },
  { label: 'Snapchat', value: 'Snapchat' },
  { label: 'TelAviv-25 Index', value: 'TelAviv-25 Index' },
  { label: 'Tesla', value: 'Tesla' },
  { label: 'Twitter Inc', value: 'Twitter Inc' },
  { label: 'Yandex', value: 'Yandex' },
  { label: 'AUD/CAD', value: 'AUDCAD' },
  { label: 'AUD/JPY', value: 'AUDJPY' },
  { label: 'AUD/USD', value: 'AUDUSD' },
  { label: 'CAD/CHF', value: 'CADCHF' },
  { label: 'CHF/JPY', value: 'CHFJPY' },
  { label: 'EUR/AUD', value: 'EURAUD' },
  { label: 'EUR/CAD', value: 'EURCAD' },
  { label: 'EUR/GBP', value: 'EURGBP' },
  { label: 'EUR/JPY', value: 'EURJPY' },
  { label: 'EUR/NZD', value: 'EURNZD' },
  { label: 'EUR/USD', value: 'EURUSD' },
  { label: 'GBP/AUD', value: 'GBPAUD' },
  { label: 'GBP/CAD', value: 'GBPCAD' },
  { label: 'GBP/CHF', value: 'GBPCHF' },
  { label: 'GBP/JPY', value: 'GBPJPY' },
  { label: 'GBP/USD', value: 'GBPUSD' },
  { label: 'NZD/USD', value: 'NZDUSD' },
  { label: 'USD/BRL', value: 'USDBRL' },
  { label: 'USD/CAD', value: 'USDCAD' },
  { label: 'USD/CHF', value: 'USDCHF' },
  { label: 'USD/INR', value: 'USDINR' },
  { label: 'USD/JPY', value: 'USDJPY' },
  { label: 'USD/NOK', value: 'USDNOK' },
  { label: 'USD/PLN', value: 'USDPLN' },
  { label: 'USD/RUB', value: 'USDRUB' },
  { label: 'USD/SEK', value: 'USDSEK' },
  { label: 'USD/TRY', value: 'USDTRY' },
  { label: 'USD/ZAR', value: 'USDZAR' },
  { label: 'AUD/CAD (OTC)', value: 'AUDCAD (OTC)' },
  { label: 'EUR/GBP (OTC)', value: 'EURGBP (OTC)' },
  { label: 'EUR/USD (OTC)', value: 'EURUSD (OTC)' },
  { label: 'GBP/USD (OTC)', value: 'GBPUSD (OTC)' },
  { label: 'NZD/USD (OTC)', value: 'NZDUSD (OTC)' },
  { label: 'USD/CHF (OTC)', value: 'USDCHF (OTC)' },
]

class Option extends React.Component {
  handleClick = event => {
    this.props.onSelect(this.props.option, event)
  }

  render() {
    const { children, isFocused, isSelected, onFocus } = this.props

    return (
      <MenuItem
        onFocus={onFocus}
        selected={isFocused}
        onClick={this.handleClick}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400,
        }}
      >
        {children}
      </MenuItem>
    )
  }
}

function SelectWrapped(props) {
  const { classes, ...other } = props

  return (
    <Select
      optionComponent={Option}
      noResultsText={<Typography>{'Nenhum resultado encontrado'}</Typography>}
      arrowRenderer={arrowProps => {
        return arrowProps.isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />
      }}
      clearable={false}
      matchPos='any'
      matchProp='any'
      ignoreCase
      ignoreAccents
      clearRenderer={() => <ClearIcon />}
      valueComponent={({ children }) => <div className="Select-value">{children}</div>}
      {...other}
    />
  )
}

const ITEM_HEIGHT = 48

const styles = theme => ({
  inputContainer: {
    display: 'inline-flex',
    position: 'relative',
    flexDirection: 'column',
    border: 0,
    padding: 0,
    minWidth: 0,
    width: '100%',
    margin: theme.spacing.unit,
    marginTop: theme.spacing.unit * 2,
  },
  // We had to use a lot of global selectors in order to style react-select.
  // We are waiting on https://github.com/JedWatson/react-select/issues/1679
  // to provide a much better implementation.
  // Also, we had to reset the default style injected by the library.
  '@global': {
    '.Select > .Select-control': {
      backgroundColor: 'transparent !important',
    },
    '.Select-placeholder, .Select--single > .Select-control .Select-value' : {
      paddingLeft: 0,
      paddingRight: 0,
      color: theme.palette.type === 'dark' ?
        theme.palette.common.white :
        theme.palette.common.black,
    },
    '.Select-input > input': {
      color: theme.palette.type === 'dark' ?
        theme.palette.common.white :
        theme.palette.common.black,
    },
    '.Select-control': {
      display: 'flex',
      alignItems: 'center',
      border: 0,
      height: 'auto',
      background: 'transparent',
      '&:hover': {
        boxShadow: 'none',
      },
    },
    '.Select-multi-value-wrapper': {
      flexGrow: 1,
      display: 'flex',
      flexWrap: 'wrap',
    },
    '.Select--multi .Select-input': {
      margin: 0,
    },
    '.Select.has-value.is-clearable.Select--single > .Select-control .Select-value': {
      padding: 0,
    },
    '.Select-noresults': {
      padding: theme.spacing.unit * 2,
    },
    '.Select-input': {
      display: 'inline-flex !important',
      padding: 0,
      height: 'auto',
    },
    '.Select-input input': {
      background: 'transparent',
      border: 0,
      padding: 0,
      cursor: 'default',
      display: 'inline-block',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      margin: 0,
      outline: 0,
    },
    '.Select-placeholder, .Select--single .Select-value': {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(16),
      padding: 0,
    },
    '.Select-placeholder': {
      opacity: 0.7,
      color: theme.palette.type === 'dark' ?
        theme.palette.common.white :
        theme.palette.common.black,
    },
    '.Select-menu-outer': {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[2],
      position: 'absolute',
      left: 0,
      top: `calc(100% + ${theme.spacing.unit}px)`,
      width: '100%',
      zIndex: 2,
      maxHeight: ITEM_HEIGHT * 4.5,
      border: 0,
    },
    '.Select.is-focused:not(.is-open) > .Select-control': {
      boxShadow: 'none',
    },
    '.Select-menu': {
      maxHeight: ITEM_HEIGHT * 4.5,
      overflowY: 'auto',
    },
    '.Select-menu div': {
      boxSizing: 'content-box',
    },
    '.Select-arrow-zone, .Select-clear-zone': {
      color: theme.palette.action.active,
      cursor: 'pointer',
      height: 21,
      width: 21,
      zIndex: 1,
    },
    // Only for screen readers. We can't use display none.
    '.Select-aria-only': {
      position: 'absolute',
      overflow: 'hidden',
      clip: 'rect(0 0 0 0)',
      height: 1,
      width: 1,
      margin: -1,
    },
  },
})

class IntegrationReactSelect extends React.Component {
  state = {
    single: null,
    multi: null,
    multiLabel: null,
  }

  handleChange = name => value => {
    this.setState({
      [name]: value,
    })
  }

  render() {
    const { classes, helperText, label, fullWidth, onChange } = this.props

    return (
      <div className={classes.inputContainer}>
        <Input
          autoFocus
          fullWidth={fullWidth}
          inputComponent={SelectWrapped}
          value={this.state.single}
          onChange={value => { onChange(value); this.handleChange('single')(value) }}
          placeholder={label}
          id="react-select-single"
          inputProps={{
            classes,
            name: 'react-select-single',
            instanceId: 'react-select-single',
            simpleValue: true,
            options: suggestions,
          }}
        />
        <FormHelperText>{helperText}</FormHelperText>
      </div>
    )
  }
}

IntegrationReactSelect.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(IntegrationReactSelect)
