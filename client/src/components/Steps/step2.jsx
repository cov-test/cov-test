import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Hint from '../Hint';
import RadioGroup from '../RadioGroup';
import DatePicker from '../DatePicker';
class Step2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
      sameHousehold: '',
    };
  }

  componentDidUpdate(nextProps, nextState) {
    const { selectedDate, sameHousehold } = this.state;
    const { onChange } = this.props;

    if (nextState.selectedDate != selectedDate || nextState.sameHousehold != sameHousehold) {
      onChange({
        daysSinceContact: selectedDate,
        sameHousehold: sameHousehold,
      });
    }
  }

  handleDatepickerUpdate = (date) => {
    this.setState({
      selectedDate: date,
    });
  };

  render() {
    const today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const selectionItems = [
      {
        label: 'Heute',
        date: today,
      },
      {
        label: 'Morgen',
        date: tomorrow,
      },
    ];

    const mycontrols = [
      {
        value: 'no',
        label: 'Nein',
      },
      {
        value: 'yes',
        label: 'Wir leben in einem Haushalt',
      },
    ];

    const datepickerProps = {
      fastSelection: selectionItems,
      selectedDate: this.state.selectedDate,
      onChange: this.handleDatepickerUpdate,
    };

    const handleChange = (value) => {
      this.setState({
        sameHousehold: value,
      });
    };
    return (
      <>
        <Typography variant="body2" color="primary">
          Hattest Du Kontakt zu einer erkrankten Person?
        </Typography>
        <Hint
          text={`Als Kontakt gilt \n•  jemanden für mehr als 15min treffen \n•  physischer Kontakt wie Hände schütteln oder küssen`}
        />
        <RadioGroup identifier="sameHousehold" onChange={handleChange} controls={mycontrols} />

        <DatePicker {...datepickerProps} />
      </>
    );
  }
}

Step2.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default hot(module)(Step2);
