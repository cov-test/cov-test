import { hot } from 'react-hot-loader';
import React from 'react';
import { styled } from '@material-ui/core/styles';
import NewReleasesOutlinedIcon from '@material-ui/icons/NewReleasesOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { Header } from '../../components';

import './Home2.css';

const Home2 = () => (
  <div className="Start">
    <div className="content">
      <div className="COV-test">
        <div className="cov">COV</div>
        <div className="test">test</div>
      </div>
      <div className="Prfe-deine-Sympthom">
        Prüfe deine Sympthome, finde Hilfe im Corona-Fall oder hilf anderen Betroffenen.
      </div>

      <div className="In-dieser-von-Unsich">
        In dieser von Unsicherheit geprägten Zeit ist es wichtig, informiert und gestärkt zu sein.
      </div>

      <Button variant="contained" size="large" className="Test-starten">
        Test starten
      </Button>
    </div>
  </div>
);

export default hot(module)(Home2);
