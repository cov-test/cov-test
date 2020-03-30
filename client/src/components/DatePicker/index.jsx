import { hot } from 'react-hot-loader';
import React from 'react';
import PropTypes from 'prop-types';

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import SpecialButtonGroup from '../Buttons/SpecialButtonGroup';

const DatePicker = ({ fastSelection, selectedDate, onChange }) => {
  const handleDateChange = (date) => {
    onChange(date);
  };

  const handleButtonClick = (selection) => {
    handleDateChange(fastSelection[Array.from(selection).pop()].date);
  };

  return (
    <>
      <SpecialButtonGroup
        buttons={fastSelection.map((item) => item.label)}
        onSelectionChange={handleButtonClick}
      />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          label="Der Kontakt war am"
          value={selectedDate}
          variant="inline"
          format="dd.MM.yyyy"
          onChange={handleDateChange}
        />
      </MuiPickersUtilsProvider>
    </>
  );
};

DatePicker.propTypes = {
  fastSelection: PropTypes.arrayOf.isRequired,
  selectedDate: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default hot(module)(DatePicker);
