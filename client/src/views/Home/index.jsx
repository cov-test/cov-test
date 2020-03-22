import { hot } from 'react-hot-loader';
import React from 'react';
import { styled } from '@material-ui/core/styles';
import NewReleasesOutlinedIcon from '@material-ui/icons/NewReleasesOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

const HomeButton = styled(ButtonBase)({
  background: '#3f2c7a',
  height: '16.25rem',
  marginTop: '5rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

const Home = () => (
  <div className="home">
    <Typography component="p" variant="subtitle1" color="inherit">
      Prüfe deine Sympthome, finde Hilfe im Corona-Fall oder hilf anderen Betroffenen.
    </Typography>
    <HomeButton>
      <span className="homeIcon">
        <CheckBoxOutlinedIcon />
      </span>
      <span>
        <Typography component="h3" variant="h3" color="inherit">
          Test starten
        </Typography>
      </span>
    </HomeButton>
    <HomeButton>
      <span className="homeIcon">
        <NewReleasesOutlinedIcon />
      </span>
      <span>
        <Typography component="h3" variant="h3" color="inherit">
          Neuigkeiten
        </Typography>
      </span>
    </HomeButton>
  </div>
);

export default hot(module)(Home);
