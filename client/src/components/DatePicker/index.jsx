import { hot } from 'react-hot-loader';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import SpecialButtonGroup from '../Buttons/SpecialButtonGroup';

const DatePicker = ({ fastSelection, selectedDate, onChange }) => {
  const compareFastSelection = (date) => {
    console.log('piiiiiep');
    const selDateInCompareSelection = fastSelection
      .map((el) => el.date)
      .findIndex((mydate) => mydate.getTime() === date.getTime());
    let returnSet = new Set();
    if (selDateInCompareSelection !== -1) {
      returnSet.add(selDateInCompareSelection);
    }
    return returnSet;
  };

  const [currentSelection, setCurrentSelection] = useState(compareFastSelection(selectedDate));

  const handleDateChange = (date) => {
    onChange(date);
    setCurrentSelection(compareFastSelection(date))
  };

  const handleButtonClick = (selection) => {
    // setCurrentSelection(selection);
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
