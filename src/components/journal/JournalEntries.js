import React from 'react'
import { useSelector } from 'react-redux';
import { LoadingNotes } from '../loading/LoadingNotes';
import JournalEntry from './JournalEntry';

 const JournalEntries = () => {

    const {notes} = useSelector(state => state.notes)
    const {loading} = useSelector(state => state.ui)

    return (
        <div className="journl__entries">
            {
                loading
                //  && <h1 style={{color: 'white'}}>cargando...</h1>
                 && <LoadingNotes/>
            }
            {
                 notes &&
                notes.map(note=>{
                    return (
                    <JournalEntry 
                        key={note.id} 
                        {...note}
                    />
                )})
            } 
        </div>
    )
}
export default JournalEntries;