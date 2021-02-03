import Swal from "sweetalert2";
import { db } from "../firebase/firebaseConfig";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";
import { finishLoading, startLoading } from "./uiActions";

export const startNewNote = () => {
    //se puede elegir cualuqier nombre para el getState(parecido al useSeletor)
    return async (dispatch, getState) => {
        dispatch(startLoading())

        //obtengo todo el stete del store de la app
        const { uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            url: ''
        }
        try {
            // enviar a un path de firestore para guardarlo
            const docRef = await db.collection(`${uid}/journal/notes`).add(newNote) //esto es una promesa

            await dispatch(activeNote(docRef.id, newNote));

            //al momento de crear una nueva nota, la carga instantaneamente
            dispatch(addNewNote(docRef.id, newNote))
            Swal.fire('Nueva nota Creada', '', 'success')
            dispatch(finishLoading())
        } catch (error) {
            console.log(error);
            dispatch(finishLoading())
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

const addNewNote = (id, note) => ({
    type: types.notesAddNew,
    payload: {
        id,
        ...note
    }
})

export const startLoadingNotes = (uid) => {
    return async (dispatch) => {
        dispatch(startLoading())
        try {
            const notes = await loadNotes(uid);
            dispatch(setNotes(notes))
            dispatch(finishLoading())
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

        if (!note.url) {
            delete note.url;
        }

        //aqui grabare los datos en firestore
        const noteToFirestore = { ...note };
        try {
            //borro el id para no cambiarlo , ya que no necesito cambiarlo
            delete noteToFirestore.id;
            await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);

            //sirve pra hacer un lazyload o pagincion, no es laa manera correcta
            // dispatch(startLoadingNotes(uid));
            dispatch(refreshNote(note.id, note)); //asi es mas rapio que del modo anterior
            Swal.fire('Guardado', 'Se han guardado los cambios correctamente', 'success')
        } catch (error) {
            console.log(error);
        }
    }
}

export const refreshNote = (id, note) => ({
    type: types.notesUpdated,
    payload: {
        id,
        note
    }
});

export const startUploading = (file) => {
    return async (dispatch, getState) => {
        const { active: activeNote } = getState().notes;

        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        })
        //fileUpload viende del helper
        const fileUrl = await fileUpload(file);
        activeNote.url = fileUrl;
        dispatch(startSaveNote(activeNote))
    }
}

export const startDeleting = (id) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        try {
            await db.doc(`${uid}/journal/notes/${id}`).delete();

            dispatch(deleteNote(id))
            //eliminar foto de cloudinary
            /*  const signature = "07470fd3dba71c3c8a70398e48988dd08d3a838f";
             cloudinary.v2.uploader.destroy('y108i3cuzsxgnd1otroc', function(error,result) {
             console.log(result, error) }); */
            Swal.fire('Nota eliminada con exito','','success');
        } catch (error) {
            console.log(error);
        }
    }
}

const deleteNote = (id) => ({
    type: types.notesDelete,
    payload: id
})
