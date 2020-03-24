import { hot } from 'react-hot-loader';
import React from 'react';
import { styled } from '@material-ui/core/styles';
import NewReleasesOutlinedIcon from '@material-ui/icons/NewReleasesOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

import { Header } from '../../components';

import './Home2.css';

const Home2= () => (
  <div className="Start">
  <div className="cov">cov</div>
  test
  
  Prüfe deine Sympthome, finde Hilfe im Corona-Fall oder hilf anderen Betroffenen.

  In dieser von Unsicherheit geprägten Zeit ist es wichtig, informiert und gestärkt zu sein.

  Test starten
  </div>
);

export default hot(module)(Home2);
