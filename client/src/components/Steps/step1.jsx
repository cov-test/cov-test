import { hot } from 'react-hot-loader';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import RadioGroup from '../RadioGroup';
import PropTypes from 'prop-types';

import Hint from '../Hint';

const Step1 = ({ onChange }) => {
  const onContactInfectedChangeListener = (value) => {
    onChange('step1', {
      contactInfected: value,
    });
  };

  const mycontrols = [
    {
      value: 'no',
      label: 'Nein',
    },
    {
      value: 'maybe',
      label: 'Ja, sie/er hat vielleicht Corona',
    },
    {
      value: 'yes',
      label: 'Ja, sie wurde positiv auf COVID-19 getestet',
    },
  ];
  return (
    <>
      <Typography variant="body2" color="primary">
        Hattest Du Kontakt zu einer erkrankten Person?
      </Typography>
      <Hint
        text={`Als Kontakt gilt \n•  jemanden für mehr als 15min treffen \n•  physischer Kontakt wie Hände schütteln oder küssen`}
      />
      <RadioGroup identifier="contactInfected" onChange={onContactInfectedChangeListener} controls={mycontrols} />
    </>
  );
};

Step1.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default hot(module)(Step1);
