import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote } from '../../actions/notesActions'
import { useForm } from '../../hooks/useFom'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const dispatch = useDispatch();
    const { active } = useSelector(state => state.notes)
    const [formValue, handleInputChange,  ,reset] = useForm(active || {
        title:'',
        body:'',
        url:''
    });
    const { title, body, url } = formValue;
    const activeId = useRef(active.id)
    useEffect(() => {
        if(active.id !== activeId.current){
            reset(active);
            activeId.current= active.id
        }
        
    }, [active,reset])

    useEffect(() => {
        dispatch(activeNote(formValue.id,{...formValue}))
    }, [formValue,dispatch])

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
                    value={title}
                    onChange={handleInputChange}
                />
                <textarea
                    placeholder="What happend today"
                    className="notes__textarea"
                    name="body"
                    value={body}
                    onChange={handleInputChange}

                ></textarea>
                {
                    url &&
                    <div className="notes__images">
                        <img
                            src={url}
                            alt="imagen"
                        />

                    </div>

                }

            </div>
        </div>
    )
}
