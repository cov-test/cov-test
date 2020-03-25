import { hot } from 'react-hot-loader';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';

import SpecialButton from '../special/index';

class SpecialButtonGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedButtons: new Set(),
    };
  }

  static propTypes = {
    buttons: PropTypes.arrayOf.isRequired,
  };

  handleButtonClick = (id) => {
    console.log(this.state.selectedButtons.has(id));
    if (!this.state.selectedButtons.has(id)) {
      this.setState({
        selectedButtons: this.state.selectedButtons.add(id),
      });
    } else {
      console.log('cannot add');
      let tempSelected = new Set([...this.state.selectedButtons]);
      tempSelected.delete(id);
      this.setState({
        selectedButtons: tempSelected,
      });
    }
  };

  render() {
    return (
      <Box display="flex" flexDirection="row" flexWrap="wrap">
        {this.props.buttons.map((button, index) => (
          <SpecialButton
            title={button}
            onButtonClick={() => {
              this.handleButtonClick(index);
            }}
            selected={this.state.selectedButtons.has(index)}
          />
        ))}
      </Box>
    );
  }
}

export default hot(module)(SpecialButtonGroup);
