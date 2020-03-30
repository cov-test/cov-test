import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';

import SpecialButton from '../Special';

class SpecialButtonGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedButtons: new Set(),
    };
  }

  static propTypes = {
    buttons: PropTypes.arrayOf.isRequired,
    onSelectionChange: PropTypes.func.isRequired,
  };

  handleButtonClick = (id) => {
    const { onSelectionChange } = this.props;
    const { selectedButtons } = this.state;
    if (!selectedButtons.has(id)) {
      this.setState({
        selectedButtons: selectedButtons.add(id),
      });
    } else {
      let tempSelected = new Set([...selectedButtons]);
      tempSelected.delete(id);
      this.setState({
        selectedButtons: tempSelected,
      });
    }
    onSelectionChange(selectedButtons);
  };

  render() {
    const { buttons } = this.props;
    const { selectedButtons } = this.state;
    return (
      <Box display="flex" flexDirection="row" flexWrap="wrap">
        {buttons.map((button, index) => (
          <SpecialButton
            title={button}
            onButtonClick={() => {
              this.handleButtonClick(index);
            }}
            selected={selectedButtons.has(index)}
          />
        ))}
      </Box>
    );
  }
}

export default hot(module)(SpecialButtonGroup);
