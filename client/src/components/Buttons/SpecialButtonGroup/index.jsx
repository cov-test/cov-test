import { hot } from 'react-hot-loader';
import React from 'react';
import PropTypes from 'prop-types';

import { SpecialButton } from '../special/index';

const SpecialButtonGroup = (props) => {
  const buttons = ['Test', 'Foobar'];
  return (
    <>
      {buttons.map((item) => {
        <SpecialButton selected={false} title={item} />;
      })}
    </>
  );
};

SpecialButtonGroup.propTypes = {};

export default hot(module)(SpecialButtonGroup);
