import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import { Step1, HandleActionButton, Header, Step2, Step3, Step4 } from '../../components';

export const Question = () => {
  const useStyles = makeStyles({
    stepper: {
      flexGrow: 1,
      background: 'transparent',
      marginTop: '0.8rem',
    },
    root: {
      margin: '15px',
    },
  });
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (value) => {
    console.log(value);
  };
  return (
    <>
      <Header />
      <div className={classes.root}>
        <MobileStepper variant="dots" steps={8} position="static" activeStep={activeStep} className={classes.stepper} />
        {
          {
            0: <Step1 onChange={handleChange} />,
            1: <Step2 onChange={handleChange} />,
            2: <Step3 onChange={handleChange} />,
            3: <Step4 onChange={handleChange} />,
          }[activeStep]
        }
        <div className={classes.root}>
          <HandleActionButton endIcon={false} title="" onButtonClick={handleBack} />{' '}
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

export default connect(mapStateToProps, {})(Question);
