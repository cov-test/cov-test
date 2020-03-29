import { hot } from 'react-hot-loader';
import React from 'react';
import Container from '@material-ui/core/Container';
import { styled, ThemeProvider } from '@material-ui/core/styles';
import { Router } from '@reach/router';
import theme from '../config/theme';

import { Home, Questionnary, Question, Hustenview } from './views';
import './App.css';

const AppContainer = styled(Container)({
  padding: '0',
});
const App = () => (
  <>
    <AppContainer maxWidth="sm" className="app">
      <ThemeProvider theme={theme}>
        <Router primary={false}>
          <Home path="/" />
          <Questionnary path="/start" />
          <Question path="/question" />
          <Hustenview path="/husten" default />
        </Router>
      </ThemeProvider>
    </AppContainer>
  </>
);

export default hot(module)(App);
