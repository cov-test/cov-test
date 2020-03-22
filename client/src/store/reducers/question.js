import { ADD_ANSWER } from '../actions/question';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_ANSWER:
      return [
        ...state,
        {
          id: action.id,
          answer: action.answer,
        },
      ];

    default:
      return state;
  }
};
