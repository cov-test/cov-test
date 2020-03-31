import { hot } from 'react-hot-loader';
import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';

import SpecialButton from '../Special';

const SpecialButtonGroup = ({ buttons, multiSelect, currentSelection, onSelectionChange }) => {
  const handleButtonClick = (id) => {
    if (!multiSelect) {
      onSelectionChange(new Set([id]));
    } else {
      onSelectionChange(currentSelection.add(id));
    }
  };

  return (
    <Box display="flex" flexDirection="row" flexWrap="wrap">
      {buttons.map((button, index) => (
        <SpecialButton
          title={button}
          onButtonClick={() => {
            handleButtonClick(index);
          }}
          selected={currentSelection.has(index)}
        />
      ))}
    </Box>
  );
};

SpecialButtonGroup.propTypes = {
  buttons: PropTypes.arrayOf.isRequired,
  multiSelect: PropTypes.bool,
  currentSelection: PropTypes.any,
  onSelectionChange: PropTypes.func.isRequired,
};

SpecialButtonGroup.defaultProps = {
  multiSelect: false,
};

export default hot(module)(SpecialButtonGroup);
