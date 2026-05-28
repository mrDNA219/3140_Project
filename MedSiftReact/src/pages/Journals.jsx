import { fetchPubMedPapers } from "../api";
import { useEffect, useState } from "react";
import { FullNoteCreator } from "../components";

function Journals({userId, token}) {

    const [journals, setJournals] = useState('');
    const [journalSearch, setJournalSearch] = useState('');

function splitArticlesStrict(rawText) {
    const pmidMatches = [...rawText.matchAll(/PMID:\s*\d+/g)];
    const chunks = rawText.split(/PMID:\s*\d+\s*/);
    const articles = [];
    for (let i = 0; i < chunks.length - 1; i++) {
        let articleBody = chunks[i].trim();
        let pmidLine = pmidMatches[i][0];
        const nextChunk = chunks[i + 1];
        const nextLines = nextChunk.split('\n');
        const nextStart = nextLines.find(line => /^\d+\.\s/.test(line.trim()));
        const nextArticleStart = nextStart ? nextStart.trim() : '';
        const fullArticle = `${articleBody}\n${pmidLine}`;
        articles.push(fullArticle.trim());
        if (nextArticleStart) {
        chunks[i + 1] = nextChunk.slice(nextChunk.indexOf(nextArticleStart));
        }
  }
  return articles;
};

const fetchPapersHelper = async (e) => {
    e.preventDefault();
    let result = await fetchPubMedPapers(journalSearch);
    if(result){
        let formatedArticles = splitArticlesStrict(result);
        setJournals(formatedArticles);
    }
};

    return (
        <>
        <div className="page-hero">
            <div className="page-hero-icon">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <line x1="10" y1="9" x2="8" y2="9"/>
                </svg>
            </div>
            <h1>Article Reader</h1>
            <p className="page-hero-subtitle">Browse complete PubMed articles and annotate as you go</p>
            <form onSubmit={fetchPapersHelper} style={{width: '100%'}}>
                <div className="search-wrapper">
                    <input name='formInput' type="text" value={journalSearch} placeholder='enter search query' onChange={(e) => setJournalSearch(e.target.value)} />
                    <button type="submit">Search</button>
                </div>
            </form>
        </div>
        {
            journals.length ? journals.map((journal) => (
                <FullNoteCreator key={Math.floor(Math.random() * (100000000 - 0 + 1))} token={token} journal={journal} userId={userId} />
            )) : null
        }
        </>
    );
};

export default Journals;