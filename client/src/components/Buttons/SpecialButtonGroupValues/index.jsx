/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';

import SpecialButton from '../Special';

class SpecialButtonGroupValues extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSelection: props.currentSelection || [],
    };
  }

  handleButtonClick = (id, value) => {
    // onSelectionChange
    const { onSelectionChange } = this.props;
    const { currentSelection } = this.state;
    this.setState({
      currentSelection: [...currentSelection, { index: id, value: value }],
    });
    onSelectionChange(currentSelection);
  };

  checkIsSelected = (index) => {
    const { currentSelection } = this.state;
    return currentSelection.find((obj) => {
      return obj.index === index;
    });
  };

  render() {
    const { buttons } = this.props;
    const { currentSelection } = this.state;
    return (
      <Box display="flex" flexDirection="row" flexWrap="wrap">
        {buttons.map((button, index) => (
          <SpecialButton
            key={index}
            title={button.label}
            onButtonClick={() => {
              this.handleButtonClick(index, button.value);
            }}
            selected={currentSelection.length > 0 ? this.checkIsSelected(index) : false}
          />
        ))}
      </Box>
    );
  }
}

SpecialButtonGroupValues.propTypes = {
  buttons: PropTypes.any.isRequired,
  currentSelection: PropTypes.any,
};

SpecialButtonGroupValues.defaultProps = {};

export default hot(module)(SpecialButtonGroupValues);
