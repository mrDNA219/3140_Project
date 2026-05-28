
import { deleteUser, getAllJournalsByUserId, deleteJournal, getAllUsersFullJournalsByUserId, deleteFullJournal, updateFullJournal} from '../api';
import { useEffect, useRef, useState } from 'react';
import { notify } from '../utils/notify';

function Dashboard({userId, navigate, setUserId, setUsername, token, username}) {
  const [fullJournals, setFullJournals] = useState([]);
  const [usersJournals, setUsersJournals] = useState([]);
  const [newFullJournalText, setNewFullJournalText] = useState('');
  const [expandedFullId, setExpandedFullId] = useState(null);
  const [expandedJournalId, setExpandedJournalId] = useState(null);
  const [showAccountSettings, setShowAccountSettings] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const hasPageBeenRendered = useRef(false);

  const handleDeleteUser = async (e) => {
    e.preventDefault();
    const result = await deleteUser(userId);
    if(result){
      window.localStorage.removeItem('userId');
      setUserId('');
      setUsername('');
      navigate("/register");
    } else {
      notify.error(result.message);
    }
  };

  const getAllJournalsHelper = async(token, userId) => {
    if(token && username){
      const result = await getAllJournalsByUserId(token, userId);
      if(result){
        setUsersJournals(result.data);
      }
    }
  };

  const getAllFullJournalsHelper = async(token, userId) => {
    if(token && username){
      const result = await getAllUsersFullJournalsByUserId(token, userId);
      if(result){
        setFullJournals(result.data);
      }
    }
  };

  const deleteJournalsHelper = async(token, journalId) => {
    const result = await deleteJournal(token, journalId);
    if(result){
      getAllJournalsHelper(token, userId);
    } else {
      notify.error(result.message);
    }
  };

  const deleteFullJournalHelper = async(token, fullJournalId) => {
    const result = await deleteFullJournal(token, fullJournalId);
    if(result){
      setExpandedFullId(null);
      getAllFullJournalsHelper(token, userId);
    } else {
      notify.error(result.message);
    }
  };

  const updateFullJournalHelper = async(token, fullJournalId, updatedText) => {
    const result = await updateFullJournal(token, fullJournalId, updatedText);
    if(result) {
      notify.success('Journal updated successfully!');
      getAllFullJournalsHelper(token, userId);
    } else {
      notify.error(result.message);
    }
  };

  useEffect(() => {
    if(hasPageBeenRendered.current){
      getAllJournalsHelper(token, userId);
      getAllFullJournalsHelper(token, userId);
    }
    hasPageBeenRendered.current = true;
  }, [userId]);

  const toggleFull = (id) => setExpandedFullId(prev => prev === id ? null : id);
  const toggleJournal = (id) => setExpandedJournalId(prev => prev === id ? null : id);

  const journalFields = [
    ['Title', 'title'],
    ['Authors', 'authors'],
    ['Journal', 'journal'],
    ['Publish Date', 'pubdate'],
    ['Pages', 'pages'],
    ['Volume', 'volume'],
    ['Issue', 'issue'],
    ['Location ID', 'elocationid'],
  ];

  return (
    <div className="dashboard-page">
      {!token && (
        <div className="dashboard-guest">
          <p className="dashboard-greeting">You're not signed in</p>
          <h1 className="dashboard-username-heading">Sign in to view your dashboard</h1>
          <div className="dashboard-guest-links">
            <a href="/login" className="btn btn-primary">Sign In</a>
            <a href="/register" className="btn btn-outline">Create Account</a>
          </div>
        </div>
      )}

      <div className="dashboard-hero" style={!token ? { display: 'none' } : {}}>
        <div className="dashboard-hero-text">
          <p className="dashboard-greeting">Welcome back</p>
          <h1 className="dashboard-username-heading">
            {username ? <span className="dashboard-username-gradient">{username}</span> : 'Dashboard'}
          </h1>
        </div>
        <button
          className="dashboard-settings-btn"
          onClick={() => { setShowAccountSettings(s => !s); setConfirmDelete(false); }}
          aria-label="Account settings"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
          </svg>
          Account
        </button>
      </div>

      {showAccountSettings && (
        <div className="account-settings-panel">
          <h3 className="account-settings-title">Account Settings</h3>
          <div className="danger-zone">
            <div className="danger-zone-info">
              <p className="danger-zone-label">Delete Account</p>
              <p className="danger-zone-desc">Permanently removes your account and all saved data. This cannot be undone.</p>
            </div>
            {!confirmDelete ? (
              <button className="danger-btn-outline" onClick={() => setConfirmDelete(true)}>
                Delete Account
              </button>
            ) : (
              <div className="danger-confirm-row">
                <span className="danger-confirm-text">Are you sure?</span>
                <button className="danger-btn-solid" onClick={handleDeleteUser}>Yes, delete</button>
                <button className="danger-btn-cancel" onClick={() => setConfirmDelete(false)}>Cancel</button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <div className="dashboard-section-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
          </div>
          <div>
            <h2 className="dashboard-section-title">Full Articles</h2>
            <p className="dashboard-section-subtitle">{fullJournals.length} saved</p>
          </div>
        </div>

        {fullJournals && fullJournals.length ? (
          <div className="accordion-list">
            {fullJournals.map((fullJournal, idx) => {
              const { _id, text } = fullJournal;
              const isOpen = expandedFullId === _id;
              const preview = text ? text.replace(/\s+/g, ' ').substring(0, 80) + '…' : `Full Journal ${idx + 1}`;
              return (
                <div key={_id} className="accordion-item">
                  <div className="accordion-header" onClick={() => toggleFull(_id)}>
                    <span className="accordion-header-title">{preview}</span>
                    <span className={`accordion-chevron${isOpen ? ' open' : ''}`}>▼</span>
                  </div>
                  {isOpen && (
                    <div className="accordion-body">
                      <textarea
                        onChange={(e) => { e.preventDefault(); setNewFullJournalText(e.target.value); }}
                        defaultValue={text}
                      />
                      <div className="accordion-actions">
                        <button className="accordion-btn-save" onClick={(e) => { e.preventDefault(); updateFullJournalHelper(token, _id, { text: newFullJournalText }); }}>
                          Save Changes
                        </button>
                        <button className="accordion-btn-delete" onClick={(e) => { e.preventDefault(); deleteFullJournalHelper(token, _id); }}>
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="dashboard-empty">No saved articles yet. Search for an article and save it from the Article Reader.</p>
        )}
      </div>

      <div className="dashboard-section-divider" />

      <div className="dashboard-section">
        <div className="dashboard-section-header">
          <div className="dashboard-section-icon dashboard-section-icon--purple">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
            </svg>
          </div>
          <div>
            <h2 className="dashboard-section-title">Journal Summaries</h2>
            <p className="dashboard-section-subtitle">{usersJournals.length} saved</p>
          </div>
        </div>

        {usersJournals && usersJournals.length ? (
          <div className="accordion-list">
            {usersJournals.map((jrn) => {
              const { _id } = jrn;
              const isOpen = expandedJournalId === _id;
              return (
                <div key={_id} className="accordion-item">
                  <div className="accordion-header" onClick={() => toggleJournal(_id)}>
                    <span className="accordion-header-title">{jrn.title || 'Untitled Journal'}</span>
                    <span className={`accordion-chevron${isOpen ? ' open' : ''}`}>▼</span>
                  </div>
                  {isOpen && (
                    <div className="accordion-body">
                      <div className="journal-meta-grid">
                        {journalFields.map(([label, key]) => jrn[key] ? (
                          <div key={key} className="journal-meta-row">
                            <span className="journal-meta-label">{label}</span>
                            <span className="journal-meta-value">{jrn[key]}</span>
                          </div>
                        ) : null)}
                      </div>
                      <div className="accordion-actions">
                        <button className="accordion-btn-delete" onClick={(e) => { e.preventDefault(); deleteJournalsHelper(token, _id); }}>
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p className="dashboard-empty">No saved journal summaries yet. Browse the Journal Library to save entries.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
