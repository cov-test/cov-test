export const ADD_ANSWER = 'ADD_ANSWER';

export const addAnswer = (id, answer) => ({
  type: ADD_ANSWER,
  id,
  answer,
});
