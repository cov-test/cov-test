import { hot } from 'react-hot-loader';
import React, { Component } from 'react';

import NumberInput from '../../components/NumberInput';

class Foobar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      textField: 13.5,
    };
  }

  editTextField = (newValue) => {
    this.setState({ textField: newValue });
  };

  render() {
    return (
      <>
        <NumberInput value={this.state.textField} label="Test Label Lalala" onChange={this.editTextField} />
      </>
    );
  }
}

export default hot(module)(Foobar);
