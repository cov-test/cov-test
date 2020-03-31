import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import { DatePicker } from '../../components';

class Foobar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDate: new Date(),
    };
  }
 
  handleDatepickerUpdate = (date) => {
    this.setState({
      selectedDate: date,
    });
  };

  render() {
    const today = new Date();
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

    const datepickerProps = {
      fastSelection: selectionItems,
      selectedDate: this.state.selectedDate,
      onChange: this.handleDatepickerUpdate,
    };
    return (
      <>
        <DatePicker {...datepickerProps} />
      </>
    );
  }
}

export default Foobar;
