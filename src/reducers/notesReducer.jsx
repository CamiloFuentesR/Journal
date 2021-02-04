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
        case types.notesAddNew:
            return{
                ...state,
                notes: [action.payload,...state.notes]
            }
        case types.notesLoad: 
        console.log( action.payload);
            return{
                ...state,
                notes: [...action.payload]
            }
        case types.notesUpdated:
            return{
                ...state,
                //solo modifica la nota que se cambio
                notes: state.notes.map(
                   note=> note.id === action.payload.id
                   //si hay un cambio
                   ? action.payload.note
                   //si no hay cambios
                   : note
                )
            }
        case types.notesDelete:
            return {
                ...state,
                active: null,
                notes : state.notes.filter(
                    note => note.id !== action.payload 
                )

            }
            //se eliminan las notas al salir, para que el sig usuario no las vea
        case types.logout:
            return {
                ...state,
                notes: [],
                active:null
            }

        default:
            return state;
    }
}