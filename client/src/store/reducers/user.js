import { ADD_USER } from '../actions/user';

export default (state = [], action) => {
    switch (action.type) {

    case ADD_USER:
        return [
            ...state,
            {
                id: action.id
            }
        ]

    default:
        return state
    }
}
