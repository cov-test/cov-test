// import { hot } from 'react-hot-loader';
// import React from 'react';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
// import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles(() => ({
//   button: {
//     top: '6rem',
//   },
// }));
// function Questionnary() {
//   const classes = useStyles();
//   return (
//     <div className="questionnary">
//       <Typography component="h1" variant="h1" color="inherit">
//         <strong>COV</strong>
//         test
//       </Typography>
//       <Typography component="p" variant="subtitle1" color="inherit">
//         Prüfe deine Sympthome, finde Hilfe im Corona-Fall oder hilf anderen Betroffenen.
//       </Typography>
//       <Typography component="p" variant="subtitle1" color="inherit">
//         In dieser von Unsicherheit geprägten Zeit ist es wichtig, informiert und gestärkt zu sein.
//       </Typography>
//       <Button variant="contained" className={classes.button} endIcon={<ArrowForwardIosIcon />}>
//         Test starten
//       </Button>
//     </div>
//   );
// }

// export default hot(module)(Questionnary);

import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { DatePicker } from '../../components';

const useStyles = makeStyles(() => ({
  button: {
    top: '6rem',
  },
}));

class Questionnary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDate: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()),
    };
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

export default hot(module)(Questionnary);
