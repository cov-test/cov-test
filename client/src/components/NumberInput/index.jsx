import { hot } from 'react-hot-loader';
import React from 'react';
import PropTypes from 'prop-types';

import { TextField, Box, makeStyles, styled } from '@material-ui/core';

const useStyles = makeStyles(() => {
  unitLabelClass: {
    textAlign: 'center';
  }
});

const StyledInput = styled(TextField)({
  margin: '20px',
});

const NumberInput = ({ value, isRequired, label, unitLabel, minValue, maxValue, stepsValue, onChange }) => {
  const classes = useStyles();
  const onChangeListener = (evt) => {
    onChange(parseFloat(evt.target.value));
  };

  return (
    <>
      <Box display="flex" flexDirection="row" flexWrap="wrap" alignItems="center">
        <StyledInput
          required={isRequired}
          type="number"
          InputProps={{ inputProps: { min: minValue, max: maxValue, step: stepsValue } }}
          label={label}
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          value={value}
          onChange={onChangeListener}
        />
        <div className={classes.unitLabelClass}>{unitLabel}</div>
      </Box>
    </>
  );
};

NumberInput.propTypes = {
  value: PropTypes.number.isRequired,
  isRequired: PropTypes.bool,
  label: PropTypes.string.isRequired,
  unitLabel: PropTypes.string.isRequired,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  stepsValue: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

NumberInput.defaultProps = {
  minValue: 9.5,
  maxValue: 199,
  stepsValue: 0.1,
  isRequired: false,
};

export default hot(module)(NumberInput);
