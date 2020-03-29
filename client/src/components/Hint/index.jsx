import { hot } from 'react-hot-loader';
import React from 'react';
import PropTypes from 'prop-types';

import { Box, Typography } from '@material-ui/core';
import { styled, makeStyles } from '@material-ui/core';

import InfoIcon from '../Icons/info';

const StyledIcon = styled(InfoIcon)({
  marginRight: '1rem',
});

const useStyles = makeStyles(() => ({
  hintText: {
    whiteSpace: 'pre-line',
    marginBottom: '1.5rem',
  },
}));

const Hint = (props) => {
  const { text } = props;
  const classes = useStyles();
  return (
    <Box display="flex" flexDirection="row" flexWrap="wrap">
      <StyledIcon />
      <Typography color="primary" className={classes.hintText}>
        {text}
      </Typography>
    </Box>
  );
};

Hint.propTypes = {
  text: PropTypes.string.isRequired,
};

export default hot(module)(Hint);
