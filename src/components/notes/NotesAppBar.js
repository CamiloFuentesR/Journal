import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote,startUploading } from '../../actions/notesActions'

export const NotesAppBar = () => {

    const dispatch = useDispatch()
    const { active } = useSelector(state => state.notes)

    const handleSave = () => {
        dispatch(startSaveNote(active))

    }

    const handlePicture = () => {
        document.querySelector('#fileselector').click()
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        file &&
        dispatch(startUploading(file))
        //para poder subir la misma imagen en dos notas
        document.querySelector('#fileselector').value = '';
    }
    return (
        <div className="notes__appbar">
            <span>28 agoto 2020</span>

            <input
                id="fileselector"
                type="file"
                name="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
            />
            <div>
                <button
                    className="btn"
                    onClick={handlePicture}

                >
                    Picture
                </button>
                <button
                    className="btn"
                    onClick={handleSave}
                >
                    Save
                </button>
            </div>

        </div>
    )
}
