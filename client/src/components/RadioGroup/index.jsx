import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';

import { styled, FormControl, FormControlLabel, Radio, RadioGroup } from '@material-ui/core';

const FormControlStyled = styled(FormControl)({
  border: 0,
});

const MyRadioGroup = ({ identifier, controls, onChange }) => {
  const handleChange = (evt) => {
    // evt.preventdefault();
    onChange(evt.target.value);
  };
  return (
    <>
      <FormControlStyled component="fieldset">
        <RadioGroup aria-label={identifier} name={identifier} onChange={handleChange}>
          {controls.map(({ value, label }) => (
            <FormControlLabel key={value} value={value} control={<Radio />} label={label} />
          ))}
        </RadioGroup>
      </FormControlStyled>
    </>
  );
};

RadioGroup.propTypes = {
  identifier: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  controls: PropTypes.any,
  onChange: PropTypes.func.isRequired,
};

RadioGroup.defaultProps = {
  identifier: 'my-radiogroup',
};

export default hot(module)(MyRadioGroup);
