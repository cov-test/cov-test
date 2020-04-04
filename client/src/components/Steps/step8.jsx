import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { Typography } from '@material-ui/core';

import Hint from '../Hint';
import RadioGroup from '../RadioGroup';
import SpecialButtonGroup from '../Buttons/SpecialButtonGroup';

const buttons = [
  'Raucher',
  'Schwanger',
  'Chronische Lungenerkrankung',
  'Einnahme von Immunsuppressiva',
  'Diabetes',
  'Nierenleiden',
  'Herz-Kreislauf-Erkrankungen',
  'Asthma',
  'Über 50 Jahre alt',
];

const Step8 = ({ onChange }) => {
  return (
    <>
      <Typography variant="body2" color="primary">
        Gehörst Du einer Risikogruppe an?
      </Typography>
      <Hint
        text={`Einige Menschen haben ein höheres Risiko\n an der Lungenkrankheit COVID-19 zu\n erkranken. Wir müssen diese Personen\n besonders schützen.`}
      />
      <SpecialButtonGroup multiSelect buttons={buttons} />
    </>
  );
};

Step8.propTypes = {};

export default hot(module)(Step8);
