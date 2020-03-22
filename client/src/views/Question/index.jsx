import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Step1 } from '../../components';

export class Question extends Component {
  render() {
    const { questionFinish } = this.props;
    return (
      <Fragment>
        <Step1 />
      </Fragment>
    );
  }
}

Question.propTypes = {
  questionFinish: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  return {
    // questionFinish: isQuestionFinish(state),
  };
};

export default connect(mapStateToProps, {})(Question);
