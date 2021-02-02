import React, { Suspense } from 'react'
import { useSelector } from 'react-redux';
import { Loading } from '../loading/Loading';
// import { JournalEntry } from './JournalEntry';
const JournalEntry = React.lazy(() => import('./JournalEntry'));

const JournalEntries = () => {

    const { notes } = useSelector(state => state.notes)

    return (
        <div className="journl__entries">
             <Suspense
                        // style={{marginBottom: 140}}
                        fallback={<p style={{color: 'white'}}>cargando...</p>}
                        // key={note.id}
                    >
            {
                notes &&
                notes.map(note => (
                   
                        <JournalEntry
                            key={note.id} 
                            {...note}
                        />
                   
                ))
            }
             </Suspense>
        </div>
    )
}
export default JournalEntries;
