import { hot } from 'react-hot-loader';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import { styled } from '@material-ui/core';
import { Hint } from '..';

const Headline = styled(Typography)({
  fontFamily: 'Lato',
  fontSize: '16px',
  fontWeight: 900,
  lineHeight: 1.5,
  color: '#3f2c7a',
});
const FormControlStyled = styled(FormControl)({
  border: 0,
});

const handleChange = (event) => {
  event.preventdefault();
  // do it later another branch
};
const Step1 = () => (
  <>
    <Headline component="h1" variant="h1" color="inherit">
      Hattest Du Kontakt zu einer erkrankten Person?
    </Headline>
    <Hint
      text={`Als Kontakt gilt \n•  jemanden für mehr als 15min treffen \n•  physischer Kontakt wie Hände schütteln oder küssen`}
    />
    <FormControlStyled component="fieldset">
      <RadioGroup aria-label="CONTACT_TO_INFECTED_PERSON" name="CONTACT_TO_INFECTED_PERSON" onChange={handleChange}>
        <FormControlLabel value="no" control={<Radio />} label="Nein" />
        <FormControlLabel value="maybe" control={<Radio />} label="Ja, sie/er hat vielleicht Corona" />
        <FormControlLabel value="yes" control={<Radio />} label="Ja, sie wurde positiv auf COVID-19 getestet" />
      </RadioGroup>
    </FormControlStyled>
  </>
);

Step1.propTypes = {};

export default hot(module)(Step1);
