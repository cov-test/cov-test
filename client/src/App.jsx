import { hot } from 'react-hot-loader';
import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { Router } from '@reach/router';

import { Header } from './components';
import { Home } from './views';
import './App.css';

const App = () => (
  <>
    <CssBaseline />
    <Container maxWidth="sm" className="app">
      <Header />
      <Router primary={false}>
        <Home path="/" default />
      </Router>
    </Container>
  </>
);

export default hot(module)(App);
