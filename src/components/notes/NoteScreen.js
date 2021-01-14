import React from 'react'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
    return (
        <div className="notes__main-content">
            <NotesAppBar/>
            
            <div className="notes__content">
                <input
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"    
                />
                <textarea
                    placeholder="What happend today"
                    className="notes__textarea"
                ></textarea>
                <div className="notes__images">
                    <img
                        src="./assets/images/tree.jpg"
                        alt="imagen"
                    />  

                </div>

            </div>
        </div>
    )
}
