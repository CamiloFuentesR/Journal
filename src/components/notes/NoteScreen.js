import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notesActions'
import { useForm } from '../../hooks/useFom'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const dispatch = useDispatch();
    const { active: note } = useSelector(state => state.notes)
    const [formValue, handleInputChange, , reset] = useForm(note || {
        title: '',
        body: '',
    });
    const { id } = formValue;
    const activeId = useRef(note.id);

    const handleDelete = () => {
        dispatch(startDeleting(id))
    }
    useEffect(() => {
        if (note.id !== activeId.current) {
            reset(note);
            activeId.current = note.id
        }
    }, [note, reset])

    //se actualiza el state mientras se va escribiendo
    useEffect(() => {
        dispatch(activeNote(formValue.id, { ...formValue }))
    }, [formValue, dispatch])

    return (
        <div className="notes__main-content">
            <NotesAppBar />

            <div className="notes__content">
                <input
                    type="text"
                    autoFocus
                    name="title"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    value={note.title}
                    onChange={handleInputChange}
                />
                <textarea
                    placeholder="What happend today"
                    className="notes__textarea"
                    name="body"
                    value={note.body}
                    onChange={handleInputChange}

                ></textarea>
                {
                    note.url &&
                    <div className="notes__images">
                        <img
                            src={note.url}
                            alt="imagen"
                        />

                    </div>

                }

            </div>
            <button
                className="btn btn-danger"
                onClick={handleDelete}
            >
                Delete
            </button>
        </div>
    )
}
