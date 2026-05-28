import { fetchPubMedSummaries, createJournal } from "../api";
import { useState } from "react";
import { notify } from "../utils/notify";

function JournalSummaries({userId, token}) {
    const [journals, setJournals] = useState([]);
    const [journalSearch, setJournalSearch] = useState('');

const fetchPapersHelper = async (e) => {
    e.preventDefault();
    let result = await fetchPubMedSummaries(journalSearch);
    if(result){
        const formattedJournals = transformJournalData(result.result);
        setJournals(formattedJournals);
    }
};

function transformJournalData(apiData) {
  const { uids = [] } = apiData;

  return uids.map(uid => {
    const journal = apiData[uid];
    return {
      title: journal.title,
      authors: journal.authors.map(a => a.name).join(', '),
      journal: journal.fulljournalname,
      pubdate: journal.pubdate,
      doi: (journal.articleids.find(id => id.idtype === 'doi') || {}).value,
      pages: journal.pages,
      volume: journal.volume,
      issue: journal.issue,
      pubtype: journal.pubtype,
      language: journal.lang,
      elocationid: journal.elocationid,
      uid: journal.uid
    };
  });
};

async function createJournalHelper(token, journal) {
    if (!token || !userId) {
        notify.warn('You must be logged in to save a journal.');
        return;
    }
    const result = await createJournal(token, journal);
    if (!result.message) {
        notify.success('Journal saved to your dashboard!');
    } else {
        notify.error(result.message);
    }
}

    return (
        <>
        <div className="page-hero">
            <div className="page-hero-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                </svg>
            </div>
            <h1>Journal Library</h1>
            <p className="page-hero-subtitle">Search, preview, and save journals to your dashboard</p>
            <form onSubmit={fetchPapersHelper} style={{width: '100%'}}>
                <div className="search-wrapper">
                    <input name='formInput' type="text" value={journalSearch} placeholder='enter search query' onChange={(e) => setJournalSearch(e.target.value)} />
                    <button type="submit">Search</button>
                </div>
            </form>
        </div>
        {
            journals.length ? journals.map((journal) => {
                const metaFields = [
                    journal.journal,
                    journal.pubdate,
                    journal.volume && journal.issue ? `Vol. ${journal.volume}, Iss. ${journal.issue}` : journal.volume ? `Vol. ${journal.volume}` : null,
                    journal.pages ? `pp. ${journal.pages}` : null,
                    journal.doi ? `DOI: ${journal.doi}` : null,
                ].filter(Boolean);

                return (
                    <div key={journal.uid} className="journal-result-card">
                        <p className="journal-result-card-title">{journal.title || 'Untitled'}</p>
                        {journal.authors && <p className="journal-result-card-authors">{journal.authors}</p>}
                        <div className="journal-result-card-divider" />
                        <div className="journal-result-card-meta">
                            {metaFields.map((field, i) => <span key={i}>{field}</span>)}
                        </div>
                        <div className="journal-result-card-actions">
                            <button className="journal-result-card-save" onClick={(e) => {
                                e.preventDefault();
                                createJournalHelper(token, {user: userId, ...journal});
                            }}>
                                Save to Dashboard
                            </button>
                        </div>
                    </div>
                );
            }) :
            null
        }
        </>
    );
}

export default JournalSummaries;