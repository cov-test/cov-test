import { hot } from 'react-hot-loader';
import React from 'react';
import Container from '@material-ui/core/Container';
import { styled } from '@material-ui/core/styles';
import { Router } from '@reach/router';
import
{
  Home, Questionnary, Question, Foobar,
} from './views';
import './App.css';

const AppContainer = styled(Container)({
  padding: '0',
});
const App = () => (
  <>
    <AppContainer maxWidth={false} className="app">
      <Router primary={false}>
        <Home path="/" default />
        <Questionnary path="/start" />
        <Question path="/question" />
        <Foobar path="/foobar" />
      </Router>
    </AppContainer>
  </>
);

export default hot(module)(App);
