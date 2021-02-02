import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
 import  JournalEntries  from './JournalEntries'
import { logoutAction } from '../../actions/authActions'
import { startNewNote } from '../../actions/notesActions'

export const SideBar = () => {
    const dispatch = useDispatch()
    const { name } = useSelector(state => state.auth)
    const handleLogout = () => {
        dispatch(logoutAction())
    }

    const handleAddNew = () => {

        dispatch(startNewNote())
    }
    return (
        <aside className="journal__sidebar">
            <div className="journal__sidebar-navbar">
                <h3 className="mt-3">
                    <i className="far fa-moon"></i>
                    <span> {name}</span>
                </h3>
                <button
                    className="btn"
                    onClick={handleLogout}
                >
                    Logout
            </button>

            </div>
            <div
                className="journal__new-entry"
                onClick={handleAddNew}
            >
                <i className="far fa-calendar-plus fa-5x"></i>
                <p className="far mt-5">New Entry</p>

            </div>
                <JournalEntries />
        </aside>
    )
}
