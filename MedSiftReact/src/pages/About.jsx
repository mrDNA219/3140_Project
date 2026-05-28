import medSiftLogo from '/MedSiftDNA.svg';

const features = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
      </svg>
    ),
    title: 'PubMed Search',
    desc: 'Query the NCBI PubMed database for full articles or journal summaries without leaving the app.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    title: 'Save & Annotate',
    desc: 'Save articles to your personal dashboard and edit their content directly to add your own notes and highlights.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/>
        <line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
    title: 'Notes',
    desc: 'Create free-form notes tied to your account. Access them from any session alongside your saved journals.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
    title: 'Dashboard',
    desc: 'All saved journals and notes are organized in one place. Expand, edit, or delete entries as your research evolves.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    ),
    title: 'User Accounts',
    desc: 'Register and log in to keep your content private and persistent across sessions.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    title: 'Journal Metadata',
    desc: 'Browse structured summaries including authors, publication date, volume, issue, and DOI for quick reference.',
  },
];

function About() {
  return (
    <div className="about-page">
      <div className="about-hero">
        <a href="https://github.com/mrDNA219/3140_Project" target="_blank" rel="noreferrer">
          <img src={medSiftLogo} alt="MedSift logo" />
        </a>
        <h1>MedSift</h1>
        <p className="about-hero-tagline">
          A focused research tool for medical students — search PubMed, save articles, and keep your notes in one place.
        </p>
        <div className="about-divider" />
      </div>

      <div className="about-intro">
        <p className="about-section-label">About</p>
        <p>
          MedSift is a web application that connects to the NCBI PubMed database and gives users
          a single interface for finding, reading, and organizing literature. You can search for full articles
          or structured journal summaries, save what's relevant to your dashboard, annotate content directly,
          and keep running notes alongside your saved material. It is not a replacement for institutional
          library systems, but it removes the friction of managing research across multiple browser tabs and
          disconnected documents.
        </p>
      </div>

      <div className="features-grid">
        {features.map((f) => (
          <div key={f.title} className="feature-card">
            <div className="feature-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="about-source">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink: 0}}>
          <ellipse cx="12" cy="12" rx="10" ry="10"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
        <div className="about-source-text">
          <h3>Data Source</h3>
          <p>
            All article and journal data is retrieved from the{' '}
            <a href="https://www.ncbi.nlm.nih.gov/home/develop/api/" target="_blank" rel="noreferrer">
              NCBI Entrez API
            </a>
            , which provides programmatic access to PubMed and other NLM databases.
            MedSift does not host or store any article content independently.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
