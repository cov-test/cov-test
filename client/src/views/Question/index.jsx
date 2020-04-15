import React, { useState } from 'react';
// import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';

import { addAnswer } from '../../store/actions/question';

import { Step1, HandleActionButton, Header, Step2, Step3, Step4, Step6, Step7, Step8 } from '../../components';

export const Question = (props) => {
  const useStyles = makeStyles({
    stepper: {
      flexGrow: 1,
      background: '#f4f2f7',
    },
    root: {
      margin: '15px',
    },
  });
  const classes = useStyles();
  const theme = useTheme();

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep != 7 ? prevActiveStep + 1 : prevActiveStep));
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep != 0 ? prevActiveStep - 1 : prevActiveStep));
  };

  const handleStepDataChange = (id, answer) => {
    console.log(id, answer);
    props.addAnswer(id, answer);
  };

  return (
    <>
      <Header />
      <div className={classes.root}>
        <MobileStepper variant="dots" steps={8} position="static" activeStep={activeStep} className={classes.stepper} />
        {
          {
            0: <Step1 onChange={handleStepDataChange} />,
            1: <Step2 onChange={handleStepDataChange} />,
            2: <Step3 onChange={handleStepDataChange} />,
            3: <Step4 onChange={handleStepDataChange} />,
            4: <Step4 />,
            5: <Step6 onChange={handleStepDataChange} />,
            6: <Step7 onChange={handleStepDataChange} />,
            7: <Step8 />,
          }[activeStep]
        }
        <div className={classes.root}>
          <HandleActionButton endIcon={false} title="" onButtonClick={handleBack} />
          <HandleActionButton endIcon={true} title="weiter" onButtonClick={handleNext} />
        </div>
      </div>
    </>
  );
};

Question.propTypes = {};

const mapStateToProps = () => {
  return {};
};

export default connect(mapStateToProps, {
  addAnswer: addAnswer,
})(Question);
