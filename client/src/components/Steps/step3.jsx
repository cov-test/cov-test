import { hot } from 'react-hot-loader';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

import SpecialButtonGroup from '../Buttons/SpecialButtonGroup';
import Hint from '../Hint';

const Step3 = ({ onChange }) => {
  const onSymptonsChangeListener = (value) => {
    onChange('step3', {
      symptoms: value,
    });
  };

  const symptomsButtons = [
    {
      value: 'fever',
      label: 'Fieber',
    },
    {
      value: 'coughing',
      label: 'Husten',
    },
    {
      value: 'shivers',
      label: 'Schüttelfrost',
    },
    {
      value: 'permanentTiredness',
      label: 'Andauernde Müdigkeit',
    },
    {
      value: 'shortnessOfBreath',
      label: 'Kurzatmigkeit',
    },
    {
      value: 'soreThroat',
      label: 'Halsschmerzen',
    },
    {
      value: 'headache',
      label: 'Kopfschmerzen',
    },
    {
      value: 'rheumaticPains',
      label: 'Gliederschmerzen',
    },
    {
      value: 'diarrhea',
      label: 'Durchfall',
    },
    {
      value: 'nausea',
      label: 'Übelkeit',
    },
  ];
  return (
    <>
      <Typography variant="body2" color="primary">
        Hast Du irgendwelche Symptome?
      </Typography>
      <Hint
        text={`Nach der eigentlichen Ansteckung mit Corona kann es noch bis zu 14 Tage dauern, bis Symptome auftreten.`}
      />
      <SpecialButtonGroup
        multiSelect
        buttons={symptomsButtons.map((item) => item.label)}
        currentSelection={new Set()}
        onSelectionChange={onSymptonsChangeListener}
      />
    </>
  );
};

Step3.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default hot(module)(Step3);
