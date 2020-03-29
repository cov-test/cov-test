import { hot } from 'react-hot-loader';
import React from 'react';
import PropTypes from 'prop-types';
import { styled, makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const StyledButton = styled(Button)({
  fontSize: '18px',
  height: '50px',
  width: '326px',
  borderRadius: '12px',
  boxShadow: '0 0 2px 0 rgba(63, 44, 122, 0.5)',
});
const StyledBackButton = styled(Button)({
  fontSize: '18px',
  height: '50px',
  width: '56px',
  borderRadius: '12px',
  color: '#efedf2',
  boxShadow: '0 0 2px 0 rgba(63, 44, 122, 0.5)',
});

const useStyles = makeStyles({
  backButton: {
    '& .MuiButton-startIcon': {
      marginLeft: 'unset',
      marginRight: 'unset',
    },
  },
});

const HandleActionButton = (props) => {
  const { onButtonClick, title, endIcon } = props;
  const classes = useStyles();
  return (
    <>
      {endIcon ? (
        <StyledButton variant="contained" color="primary" onClick={onButtonClick} endIcon={<ArrowForwardIosIcon />}>
          {title}
        </StyledButton>
      ) : (
        <StyledBackButton
          variant="contained"
          color="primary"
          className={classes.backButton}
          onClick={onButtonClick}
          startIcon={<ArrowBackIosIcon />}
        >
          {title}
        </StyledBackButton>
      )}
    </>
  );
};

HandleActionButton.propTypes = {
  endIcon: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired,
};

export default hot(module)(HandleActionButton);
