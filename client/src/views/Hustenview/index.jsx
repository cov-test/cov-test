import { hot } from 'react-hot-loader';
import React from 'react';
import { styled } from '@material-ui/core/styles';
import NewReleasesOutlinedIcon from '@material-ui/icons/NewReleasesOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

import { Header } from '../../components';

const Hustenview = () => (
  <>
    <Header />
    <div className="home">
      <Typography component="p" variant="subtitle1" color="inherit">
        Hast Du Husten?
      </Typography>
    </div>
  </>
);

export default hot(module)(Hustenview);

