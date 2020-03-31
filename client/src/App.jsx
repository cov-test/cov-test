import { hot } from 'react-hot-loader';
import React from 'react';
import Container from '@material-ui/core/Container';
import { styled, ThemeProvider, withStyles } from '@material-ui/core/styles';
import { Router } from '@reach/router';
import theme from '../config/theme';

import { Home, Questionnary, Question, Foobar } from './views';
import './App.css';

const AppContainer = styled(Container)({
  padding: '0',
});
const GlobalCss = withStyles({
  // @global is handled by jss-plugin-global.
  '@global': {
    '.MuiRadio-colorSecondary.Mui-checked': {
      color: '#3f2c7a',
    },
  },
})(() => null);
const App = () => (
  <>
    <GlobalCss />
    <AppContainer maxWidth="sm" className="app">
      <ThemeProvider theme={theme}>
        <Router primary={false}>
          <Home path="/" default />
          <Questionnary path="/start" />
          <Question path="/question" />
          <Foobar path="/foobar" />
        </Router>
      </ThemeProvider>
    </AppContainer>
  </>
);

export default hot(module)(App);
