import { combineReducers } from 'redux';

import users from './user';
import questions from './question';

export default combineReducers({
  users,
  questions,
});
