import { ADD_ANSWER } from '../actions/question';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ANSWER:
      let findIndex = state.findIndex((obj) => obj.id == action.id);
      let newAnswers = [...state];
      if (findIndex !== -1) {
        newAnswers[findIndex] = {
          id: action.id,
          answer: action.answer,
        };
      } else {
        newAnswers.push({
          id: action.id,
          answer: action.answer,
        });
      }
      return newAnswers;

    default:
      return state;
  }
};
