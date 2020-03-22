import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  button: {
    top: '6rem',
  },
}));
function Questionnary() {
  const classes = useStyles();
  return (
    <div className="questionnary">
      <Typography component="h1" variant="h1" color="inherit">
        <strong>COV</strong> test
      </Typography>
      <Typography component="p" variant="subtitle1" color="inherit">
        Prüfe deine Sympthome, finde Hilfe im Corona-Fall oder hilf anderen Betroffenen.
      </Typography>
      <Typography component="p" variant="subtitle1" color="inherit">
        In dieser von Unsicherheit geprägten Zeit ist es wichtig, informiert und gestärkt zu sein.
      </Typography>
      <Button variant="contained" className={classes.button} endIcon={<ArrowForwardIosIcon />}>
        Test starten
      </Button>
    </div>
  );
}

export default hot(module)(Questionnary);
