import { useState } from 'react';
import { createNote } from '../api/index';
import { notify } from '../utils/notify';

function NoteCreator({userId, getNotesHelper, token}) {

    const [newNote, setNewNote] = useState({ text: '', author: '' });

    async function createNoteHelper() {
        if (!token || !userId) {
            notify.warn('You must be logged in to create a note.');
            return;
        }
        const result = await createNote(token, newNote);
        if (result && !result.message) {
            notify.success('Note created successfully!');
            getNotesHelper();
        } else {
            notify.error(result?.message || 'Failed to create note.');
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        createNoteHelper();
    };

    return (
        <div className='main-content'>
            <h1>Note Creator</h1>
            <form onSubmit={handleSubmit}>
                <textarea type="text" placeholder='Start typing...' value={newNote.text} onChange={(e) => setNewNote({ text: e.target.value, author: userId })} />
                <button className="header1 outline" type="submit">Create Note</button>
            </form>
        </div>
    );
}

export default NoteCreator;
