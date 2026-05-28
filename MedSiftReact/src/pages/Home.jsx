import scanImg from '/comp-scans.jpg';
import laptopImg from '/laptop-stetho.jpg';
import groupImg from '/table-group.jpg';

const topics = [
  {
    img: scanImg,
    label: 'Neuroimaging',
    desc: 'MRI, fMRI, CT, and advanced brain mapping — search the latest diagnostic imaging literature.',
  },
  {
    img: laptopImg,
    label: 'Digital Health',
    desc: 'AI-assisted diagnostics, telemedicine, and electronic health systems shaping modern clinical practice.',
  },
  {
    img: groupImg,
    label: 'Clinical Research',
    desc: 'Published trials, systematic reviews, and meta-analyses across all major medical specialties.',
  },
];

function Home({ navigate, username }) {
  return (
    <div className="home-page">
      <div className="home-hero">
        {username && <p className="home-welcome">Welcome back, {username}</p>}
        <h1>Your research,<br />organized.</h1>
        <p className="home-hero-subtitle">
          Search PubMed, read full articles, save journal summaries, and keep your notes — all in one place.
        </p>
        <div className="home-cta-group">
          <a href="/journals" className="btn btn-primary">Article Reader</a>
          <a href="/journals_summaries" className="btn btn-outline">Journal Library</a>
        </div>
      </div>

      <div className="home-topics">
        <p className="about-section-label">Explore Topics</p>
        <div className="home-topics-grid">
          {topics.map((t) => (
            <div
              key={t.label}
              className="topic-card"
              style={{ backgroundImage: `url(${t.img})` }}
            >
              <div className="topic-card-overlay" />
              <div className="topic-card-content">
                <h3>{t.label}</h3>
                <p>{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
