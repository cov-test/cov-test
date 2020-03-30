import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import SpecialButtonGroup from '../Buttons/SpecialButtonGroup';

class DatePicker extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    fastSelection: PropTypes.arrayOf.isRequired,
    selectedDate: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  handleDateChange = (date) => {
    this.props.onChange(date);
  };

  handleButtonClick = (selection) => {
    this.handleDateChange(this.props.fastSelection[Array.from(selection).pop()].date);
  };

  render() {
    const { selectedDate } = this.props;
    return (
      <>
        <SpecialButtonGroup
          buttons={this.props.fastSelection.map((item) => item.label)}
          onSelectionChange={this.handleButtonClick}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            label="Der Kontakt war am"
            value={selectedDate}
            variant="inline"
            format="dd.MM.yyyy"
            onChange={this.handleDateChange}
          />
        </MuiPickersUtilsProvider>
      </>
    );
  }
}

export default hot(module)(DatePicker);
