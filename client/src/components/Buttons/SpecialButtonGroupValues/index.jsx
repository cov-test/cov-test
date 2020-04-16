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

  componentDidUpdate(nextProps, nextState) {
    const { currentSelection } = this.state;
    const { onSelectionChange } = this.props;
    if (nextState.currentSelection != currentSelection) {
      onSelectionChange(currentSelection);
    }
  }

  checkIsSelected = (index) => {
    const { currentSelection } = this.state;
    return currentSelection.find((obj) => {
      return obj.index === index;
    });
  };

  handleButtonClick = (id, value) => {
    const { currentSelection } = this.state;
    if (currentSelection.length > 0) {
      if (!this.checkIsSelected(id)) {
        console.log('is not selected');
        this.setState({
          currentSelection: [...currentSelection, { index: id, value: value }],
        });
      } else {
        this.setState({
          currentSelection: currentSelection.filter((sel) => sel.index !== id),
        });
      }
    } else {
      this.setState({
        currentSelection: [...currentSelection, { index: id, value: value }],
      });
    }
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
