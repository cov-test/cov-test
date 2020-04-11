/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';

import SpecialButton from '../Special';

class SpecialButtonGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSelection: props.currentSelection || new Set(),
    };
  }
  handleButtonClick = (id) => {
    const { multiSelect, currentSelection, onSelectionChange } = this.props;
    if (!multiSelect) {
      onSelectionChange(new Set([id]));
    } else {
      onSelectionChange(currentSelection.add(id));
    }
  };

  render() {
    const { buttons, multiSelect, currentSelection, onSelectionChange } = this.props;

    return (
      <Box display="flex" flexDirection="row" flexWrap="wrap">
        {buttons.map((button, index) => (
          <SpecialButton
            key={index}
            title={button}
            onButtonClick={() => {
              handleButtonClick(index);
            }}
            selected={currentSelection ? currentSelection.has(index) : false}
          />
        ))}
      </Box>
    );
  }
}

SpecialButtonGroup.propTypes = {
  buttons: PropTypes.any.isRequired,
  multiSelect: PropTypes.bool,
  currentSelection: PropTypes.any,
  onSelectionChange: PropTypes.func.isRequired,
};

SpecialButtonGroup.defaultProps = {
  multiSelect: false,
  currentSelection: new Set(),
};

export default hot(module)(SpecialButtonGroup);
