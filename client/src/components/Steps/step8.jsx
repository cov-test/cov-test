import React from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import { Typography } from '@material-ui/core';

import Hint from '../Hint';
import RadioGroup from '../RadioGroup';
import SpecialButtonGroupValues from '../Buttons/SpecialButtonGroupValues';

const Step8 = ({ onChange }) => {
  const onRiskGroupChangeListener = (value) => {
    onChange('step8', {
      riskGroup: value,
    });
  };
  const riskGroupButtons = [
    {
      value: 'smoker',
      label: 'Raucher',
    },
    {
      value: 'pregnant',
      label: 'Schwanger',
    },
    {
      value: 'chronicLungDisease',
      label: 'Chronische Lungenerkrankung',
    },
    {
      value: 'consumptionOfImmunoSuppressantDrugs',
      label: 'Einnahme von Immunsuppressiva',
    },
    {
      value: 'diabetes',
      label: 'Diabetes',
    },
    {
      value: 'kidneyDisease',
      label: 'Nierenleiden',
    },
    {
      value: 'cardiovascularDisease',
      label: 'Herz-Kreislauf-Erkrankungen',
    },
    {
      value: 'overFiftyYearsYold',
      label: 'Über 50 Jahre alt',
    },
  ];
  return (
    <>
      <Typography variant="body2" color="primary">
        Gehörst Du einer Risikogruppe an?
      </Typography>
      <Hint
        text={`Einige Menschen haben ein höheres Risiko\n an der Lungenkrankheit COVID-19 zu\n erkranken. Wir müssen diese Personen\n besonders schützen.`}
      />
      <SpecialButtonGroupValues multiSelect buttons={riskGroupButtons} onSelectionChange={onRiskGroupChangeListener} />
    </>
  );
};

Step8.propTypes = {};

export default hot(module)(Step8);
