import { db } from "../firebase/firebaseConfig";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";


export const startNewNote = () => {
    //se puede elegir cualuqier nombre para el getState(parecido al useSeletor)
    return async (dispatch,getState) => {
        //obtengo todo el stete del store de la app
        const {uid} = getState().auth;

        const newNote = {
            title:'',
            body:'',
            date: new Date().getTime()
        }

        // enviar a un path de firestore para guardarlo
        const docRef = await db.collection(`${uid}/journal/notes`).add(newNote) //esto es una promesa

        dispatch(activeNote(docRef.id, newNote));
    }
}

export const activeNote = (id,note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }

});

export const startLoadingNotes = (uid) => {
    return async (dispatch) => {
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes))

    }

}

//las notes viennes de la bdd de fire
export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes

})