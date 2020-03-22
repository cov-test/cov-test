import { ADD_USER } from '../actions/user';

export default ([], { type, payload }) => {
    switch (type) {

    case ADD_USER:
        return { ...state, ...payload }

    default:
        return state
    }
}
