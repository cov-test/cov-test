import { hot } from 'react-hot-loader';

import React from 'react';
import PropTypes from 'prop-types';

import InfoIcon from '../Icons/info';

function Hint(props) {
  const { text } = props;
  return (
    <>
      <InfoIcon />
      {text}
    </>
  );
}

Hint.propTypes = {
  text: PropTypes.string.isRequired,
};

export default hot(module)(Hint);
