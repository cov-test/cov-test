import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SpecialButton } from '../index';

export class Step1 extends Component {
  render() {
    return (
      <Fragment>
        <SpecialButton />
      </Fragment>
    );
  }
}

Step1.propTypes = {};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps, {})(Step1);
