import { hot } from 'react-hot-loader';
import React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const StyledButton = styled(Button)({
  fontSize: '18px',
  height: '48px',
  paddingLeft: '16px',
  paddingRight: '16px',
  paddingTop: '12px',
  paddingBottom: '12px',
});

const SpecialButton = (props) => {
  const { selected, title } = props;
  return (
    <>
      {selected ? (
        <StyledButton variant="contained" color="primary">{title}</StyledButton>
      ) : (
        <StyledButton variant="outlined" color="primary">
          {title}
        </StyledButton>
      )}
    </>
  );
};

SpecialButton.propTypes = {
  selected: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
};

export default hot(module)(SpecialButton);
