import Swal from "sweetalert2";
import { db } from "../firebase/firebaseConfig";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";


export const startNewNote = () => {
    //se puede elegir cualuqier nombre para el getState(parecido al useSeletor)
    return async (dispatch, getState) => {

        //obtengo todo el stete del store de la app
        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }
        try {
            // enviar a un path de firestore para guardarlo
            const docRef = await db.collection(`${uid}/journal/notes`).add(newNote) //esto es una promesa

            await dispatch(activeNote(docRef.id, newNote));

            //al momento de crear una nueva nota, la carga instantaneamente
            await dispatch(startLoadingNotes(uid))
        } catch (error) {
            console.log(error);
        }

    }
}

export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }

});

export const startLoadingNotes = (uid) => {
    return async (dispatch) => {
        try {
            const notes = await loadNotes(uid);
            dispatch(setNotes(notes))
        } catch (error) {
            console.log(error);
        }


    }

}

//las notes viennes de la bdd de fire
export const setNotes = (notes) => ({
    type: types.notesLoad,
    payload: notes

})

export const startSaveNote = (note) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;

        if (!note.url ) {

            delete note.url;
        }

        //aqui grabare los datos en firestore
        const noteToFirestore = { ...note };
        try {
            //borro el id para no cambiarlo , ya que no necesito cambiarlo
            delete noteToFirestore.id;
            await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);
            dispatch(startLoadingNotes(uid));
            Swal.fire('Guardado','Se han guardado los cambios correctamente','success')
        } catch (error) {
            console.log(error);
        }
    }

}