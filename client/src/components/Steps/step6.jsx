import React, { useState } from 'react';
import { hot } from 'react-hot-loader';
import { Typography } from '@material-ui/core';

import RadioGroup from '../RadioGroup';
import { CountrySelect } from '../';

const Step6 = () => {
  const [travelled, setTravelled] = useState();
  const [countries, setCountries] = useState();

  const onTravelledChangeListener = (chng) => {
    setTravelled(chng);
  };

  const onCountriesChangedListener = (sel) => {
    setCountries(sel);
  };

  let mycontrols = [
    {
      value: 'no',
      label: 'Nein',
    },
    {
      value: 'nat',
      label: 'Ja, innerhalb Deutschlands',
    },
    {
      value: 'int',
      label: 'Ja, und zwar nach',
    },
  ];
  console.log('hi');
  return (
    <>
      <Typography variant="body2" color="primary">
        Bist Du in den letzten vier Wochen verreist?
      </Typography>
      <RadioGroup onChange={onTravelledChangeListener} controls={mycontrols} />
      {travelled === 'int' && <CountrySelect label="Länder auswählen" onChange={onCountriesChangedListener} />}
    </>
  );
};

export default hot(module)(Step6);
