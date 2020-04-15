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

  usingCurrentSelectionProps = () => (this.props.currentSelection !== undefined ? true : false);

  handleButtonClick = (id) => {
    const { multiSelect, currentSelection, onSelectionChange } = this.props;
    if (!multiSelect) {
      if (this.usingCurrentSelectionProps()) {
        onSelectionChange(new Set([id]));
      } else {
        this.setState({
          currentSelection: new Set([id]),
        });
      }
    } else {
      if (this.usingCurrentSelectionProps()) {
        if (!currentSelection.has(id)) {
          onSelectionChange(currentSelection.add(id));
        } else {
          const newSelection = new Set(currentSelection);
          newSelection.delete(id);
          onSelectionChange(newSelection);
        }
      } else {
        if (currentSelection.has(id)) {
          this.setState(({ currentSelection }) => ({
            currentSelection: new Set(currentSelection).add(id),
          }));
        } else {
          this.setState(({ currentSelection }) => {
            const newSelection = new Set(currentSelection);
            newSelection.delete(id);
            return {
              currentSelection: newSelection,
            };
          });
        }
      }
    }
  };

  render() {
    const { buttons, currentSelection } = this.props;

    return (
      <Box display="flex" flexDirection="row" flexWrap="wrap">
        {buttons.map((button, index) => (
          <SpecialButton
            key={index}
            title={button}
            onButtonClick={() => {
              this.handleButtonClick(index);
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
};

export default hot(module)(SpecialButtonGroup);
