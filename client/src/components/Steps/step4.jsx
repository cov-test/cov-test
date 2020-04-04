import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Hint from '../Hint';
import NumberInput from '../NumberInput';
import { TextField, Box, makeStyles, styled } from '@material-ui/core';

const useStyles = makeStyles(() => {
  unitLabelClass: {
    textAlign: 'center';
  }
});
class Step4 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
      fever: 0,
    };
  }
  componentDidUpdate(nextProps, nextState) {
    const { selectedDate, fever } = this.state;
    const { onChange } = this.props;

    if (nextState.selectedDate != selectedDate || nextState.fever != fever) {
      onChange({
        FEVER: {
          maximumTemperatureInDegrees: fever,
          daysSinceMaximumTemperature: selectedDate,
        },
      });
    }
  }
  handleDatepickerUpdate = (date) => {
    this.setState({
      selectedDate: date,
    });
  };
  handleChange = (value) => {
    this.setState({
      fever: value,
    });
  };

  render() {
    const { fever, selectedDate } = this.state;
    return (
      <>
        <Typography variant="body2" color="primary">
          Du hast Fieber?
        </Typography>
        <Hint text={`Fieber misst man am besten mit dem Fieberthermometer unter der Zunge oder in der Achselhöhle`} />
        <NumberInput
          onChange={this.handleChange}
          isRequired={true}
          unitLabel="°C"
          value={fever}
          label="Wie hoch war dein Fieber maximal?"
          maxValue={55.5}
        />
        <div className="flex-row">
          <Typography variant="subtitle2" color="primary">
            Wann wurde diese maximale Temperatur erreicht? *
          </Typography>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              value={selectedDate}
              variant="inline"
              format="dd.MM.yyyy"
              onChange={this.handleDatepickerUpdate}
            />
          </MuiPickersUtilsProvider>
        </div>
      </>
    );
  }
}

Step4.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default hot(module)(Step4);
