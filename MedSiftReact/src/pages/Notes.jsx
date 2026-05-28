import { useEffect, useState } from 'react';
import { getAllNotesByAuthorId, deleteNote, createNote, getAllJournalsByUserId } from '../api';
import { notify } from '../utils/notify';

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function Notes({ userId, token }) {
  const [notes, setNotes]         = useState([]);
  const [newText, setNewText]     = useState('');
  const [inspiration, setInspiration] = useState([]);

  async function getNotesHelper() {
    const result = await getAllNotesByAuthorId(userId);
    if (result) setNotes(result);
  }

  async function getInspirationHelper() {
    if (!token || !userId) return;
    const result = await getAllJournalsByUserId(token, userId);
    if (result?.data?.length) {
      setInspiration(result.data.map(j => j.title).filter(Boolean).slice(0, 8));
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!newText.trim()) return;
    if (!token || !userId) {
      notify.warn('You must be logged in to create a note.');
      return;
    }
    const result = await createNote(token, { text: newText, author: userId });
    if (result && !result.message) {
      notify.success('Note saved!');
      setNewText('');
      getNotesHelper();
    } else {
      notify.error(result?.message || 'Failed to create note.');
    }
  }

  async function handleDelete(noteId) {
    if (!token || !userId) {
      notify.warn('You must be logged in to delete a note.');
      return;
    }
    const result = await deleteNote(token, noteId);
    if (result && !result.message) {
      getNotesHelper();
    } else {
      notify.error(result?.message || 'Failed to delete note.');
    }
  }

  function handleChipClick(title) {
    setNewText(prev => prev + (prev ? '\n\n' : '') + `Re: ${title}\n`);
  }

  useEffect(() => {
    getNotesHelper();
    getInspirationHelper();
  }, [userId]);

  return (
    <div className="notes-page">
      <div className="notes-composer">
        <div className="notes-composer-header">
          <h2>Notes</h2>
          <p>Jot down ideas, observations, or anything worth keeping.</p>
        </div>

        {inspiration.length > 0 && (
          <div className="inspiration-section">
            <span className="inspiration-label">From your library</span>
            <div className="inspiration-chips">
              {inspiration.map((title, i) => (
                <button key={i} className="inspiration-chip" onClick={() => handleChipClick(title)}>
                  {title}
                </button>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'contents' }}>
          <textarea
            className="notes-textarea"
            placeholder="Start writing..."
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <div className="notes-composer-footer">
            <button className="notes-submit" type="submit">Save Note</button>
          </div>
        </form>
      </div>

      {notes.length > 0 && (
        <div className="notes-list">
          <p className="notes-list-label">{notes.length} saved {notes.length === 1 ? 'note' : 'notes'}</p>
          {notes.map((note) => (
            <div key={note._id} className="note-card">
              <p className="note-card-text">{note.text}</p>
              <div className="note-card-footer">
                <span className="note-card-date">{formatDate(note.createdAt)}</span>
                <button className="note-card-delete" onClick={() => handleDelete(note._id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Notes;
