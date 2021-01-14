import React from 'react'
import { JournalEntry } from './JournalEntry';

export const JournalEntries = () => {

    const entries = [1,2,3,];
    return (
        <div className="journl__entries">
            {
                entries.map(value=> (
                    <JournalEntry key={value} />
                ))
            }
        </div>
    )
}
