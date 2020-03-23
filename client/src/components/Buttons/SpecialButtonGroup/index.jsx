import { hot } from 'react-hot-loader';
import React from 'react';
import PropTypes from 'prop-types';

import SpecialButton from '../special/index';

const SpecialButtonGroup = (props) => {
  const { buttons } = props;
  return (
    <>
      {buttons.map((button) => (
        <>
          <SpecialButton title={button} selected={true} />
        </>
      ))}
    </>
  );
};

SpecialButtonGroup.propTypes = {
  buttons: PropTypes.arrayOf.isRequired,
};

export default hot(module)(SpecialButtonGroup);
