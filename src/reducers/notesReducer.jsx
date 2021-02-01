import { types } from "../types/types";


const initialState = {
    notes: [],
    active: null
}

export const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.notesActive:
            return {
                ...state,
                active: {
                    ...action.payload
                }
            }
        case types.notesLoad: 
            return{
                ...state,
                notes: [...action.payload]
            }
            //se eliminan las notas al salir, para que el sig usuario no las vea
        case types.logout:
            return {}

        default:
            return state;
    }
}