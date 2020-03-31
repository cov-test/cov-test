import { hot } from 'react-hot-loader';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';

import SpecialButton from '../Special';

const SpecialButtonGroup = ({ buttons, multiSelect, onSelectionChange }) => {
  const [selectedButtons, setSelectedButtons] = useState(new Set());

  const handleButtonClick = (id) => {
    if (!multiSelect) {
      setSelectedButtons(new Set([id]));
    } else {
      if (!selectedButtons.has(id)) {
        setSelectedButtons(selectedButtons.add(id));
      } else {
        let tempSelected = new Set([...selectedButtons]);
        tempSelected.delete(id);
        setSelectedButtons(tempSelected);
      }
    }
    onSelectionChange(selectedButtons);
  };

  return (
    <Box display="flex" flexDirection="row" flexWrap="wrap">
      {buttons.map((button, index) => (
        <SpecialButton
          title={button}
          onButtonClick={() => {
            handleButtonClick(index);
          }}
          selected={selectedButtons.has(index)}
        />
      ))}
    </Box>
  );
};

SpecialButtonGroup.propTypes = {
  buttons: PropTypes.arrayOf.isRequired,
  multiSelect: PropTypes.bool,
  onSelectionChange: PropTypes.func.isRequired,
};

SpecialButtonGroup.defaultProps = {
  multiSelect: false,
};

export default hot(module)(SpecialButtonGroup);
