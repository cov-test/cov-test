import React from 'react';
import { hot } from 'react-hot-loader';
import { CountrySelect } from '../../components';

const onChangeListener = (sel) => {
  console.log(sel);
};

const CountrySelection = () => {
  return (
    <>
      <CountrySelect label="Test Label" onChange={onChangeListener} />
    </>
  );
};

export default hot(module)(CountrySelection);
