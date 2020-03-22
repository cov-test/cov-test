export const ADD_USER = 'ADD_USER'

export const addUser = () => ({
    type: ADD_USER,
    id: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
});