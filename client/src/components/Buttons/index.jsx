import { hot } from 'react-hot-loader';
import React from 'react';
import { styled } from '@material-ui/core/styles';
import { Button, Box } from '@material-ui/core';
const BigButton = styled(Button)({
  background: '#3f2c7a',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px'
});

const homeButton = () => (
  <React.Fragment>
    <div className='homeButton'>
      <Box component='span' m={1}>
        <BigButton />
      </Box>
    </div>
  </React.Fragment>
);

export default hot(module)(homeButton);
