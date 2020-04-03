import React from 'react';
import { hot } from 'react-hot-loader';
import PropTypes from 'prop-types';

import Select from 'react-select';
import { styled, Typography } from '@material-ui/core';

import { countries } from './countries';

const StyledSelect = styled(Select)({
  width: '272px',
});

const CountrySelect = ({ label, onChange }) => {
  const onChangeListener = (selectedOptions) => {
    onChange(selectedOptions.map((el) => el.value));
  };
  return (
    <>
      <Typography variant="body2" color="primary">
        {label}*
      </Typography>
      <StyledSelect isMulti options={countries} onChange={onChangeListener} />
    </>
  );
};

CountrySelect.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default hot(module)(CountrySelect);
