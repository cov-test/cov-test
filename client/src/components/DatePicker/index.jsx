import { hot } from 'react-hot-loader';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import SpecialButtonGroup from '../Buttons/SpecialButtonGroup';

const DatePicker = ({ fastSelection, selectedDate, onChange }) => {

  const selDateinFastSel = fastSelection
    .map((el) => el.date)
    .findIndex((mydate) => mydate.getTime() === selectedDate.getTime());
  let selSet = new Set();
  if (selDateinFastSel !== -1) {
    selSet.add(selDateinFastSel);
  }
  
  const [currentSelection, setCurrentSelection] = useState(selSet);

  const handleDateChange = (date) => {
    onChange(date);
  };

  const handleButtonClick = (selection) => {
    setCurrentSelection(selection);
    handleDateChange(fastSelection[Array.from(selection).pop()].date);
  };

  return (
    <>
      <SpecialButtonGroup
        buttons={fastSelection.map((item) => item.label)}
        currentSelection={currentSelection}
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
