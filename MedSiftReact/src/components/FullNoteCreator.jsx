import { useEffect, useState } from "react";
import { createFullJournal } from "../api";
import { notify } from "../utils/notify";

function extractTitle(text) {
    if (!text) return 'Article';
    const first = text.split('\n').map(l => l.trim()).find(l => l.length > 0) || '';
    const clean = first.replace(/^\d+\.\s*/, '');
    return clean.length > 90 ? clean.substring(0, 90) + '…' : clean || 'Article';
}

function FullNoteCreator({journal, userId, token}) {

    const [fullJournalText, setFullJournalText] = useState('');

    async function createFullJournalHelper(journal) {
        if (!token || !userId) {
            notify.warn('You must be logged in to save a journal.');
            return;
        }
        const result = await createFullJournal(token, journal);
        if (!result.message) {
            notify.success('Journal saved successfully!');
        } else {
            notify.error(result.message);
        }
    }

    useEffect(() => {
        setFullJournalText(journal);
    }, []);

    return (
        <div className="article-card">
            <div className="article-card-header">
                <span className="article-card-header-title">{extractTitle(fullJournalText)}</span>
            </div>
            <textarea
                spellCheck="false"
                value={fullJournalText}
                onChange={(e) => { e.preventDefault(); setFullJournalText(e.target.value); }}
            />
            <div className="article-card-footer">
                <button className="article-card-save" onClick={() => createFullJournalHelper({user: userId, text: fullJournalText})}>
                    Save Journal
                </button>
            </div>
        </div>
    );
}

export default FullNoteCreator;
