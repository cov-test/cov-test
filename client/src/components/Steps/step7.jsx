import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { Typography } from '@material-ui/core';

import Hint from '../Hint';
import RadioGroup from '../RadioGroup';

const radioControls = [
  {
    value: 'edu',
    label: 'Lehrer, Schüler, Kindergärtner',
  },
  {
    value: 'med',
    label: 'Medizinischer Bereich',
  },
  {
    value: 'muchcontact',
    label: 'Ich habe beruflich viel Kontakt mit Menschen.',
  },
  {
    value: 'none',
    label: 'Ich habe einen anderen Beruf.',
  },
];

const Step7 = ({ onChange }) => {
  const radioChangeListener = (sel) => {
    console.log(sel);
    onChange('step7', {
      'job': sel,
    });
  };

  return (
    <>
      <Typography variant="body2" color="primary">
        Wo arbeitest Du?
      </Typography>
      <Hint
        text={`Corona wird über Kontakt mit anderen Menschen übertragen. Je mehr Menschen Du triffst, desto mehr trägst Du zur Verbreitung des Virus bei.`}
      />
      <RadioGroup controls={radioControls} onChange={radioChangeListener} />
    </>
  );
};

Step7.propTypes = {};

export default hot(module)(Step7);
