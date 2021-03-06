import { hot } from 'react-hot-loader';
import React, { Suspense } from 'react';
import Container from '@material-ui/core/Container';
import { styled, ThemeProvider, withStyles } from '@material-ui/core/styles';
import { Router } from '@reach/router';
import { Provider } from 'react-redux';
import store from './store/store';
import theme from '../config/theme';

// import i18n (needs to be bundled ;))
import './i18n';

import { Home, Questionnary, Question } from './views';
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
  <Provider store={store}>
    <Suspense fallback="loading">
      <GlobalCss />
      <AppContainer maxWidth="sm" className="app">
        <ThemeProvider theme={theme}>
          <Router primary={false}>
            <Home path="/" default />
            <Questionnary path="/start" />
            <Question path="/question" />
          </Router>
        </ThemeProvider>
      </AppContainer>
    </Suspense>
  </Provider>
);

export default hot(module)(App);
