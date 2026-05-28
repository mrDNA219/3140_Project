import { useLocation } from 'react-router';

function Navigation({ navigate, userId, token }) {
  const location = useLocation();
  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <a href="/" className="nav-brand">
          <img src="/MedSiftDNA.svg" className="logo-icon" alt="MedSift logo" />
          <span className="nav-brand-name">MedSift</span>
        </a>
        <ul className="nav-menu">
          <li className="nav-item"><a className={`nav-link${isActive('/') ? ' active' : ''}`} href="/">Home</a></li>
          <li className="nav-item"><a className={`nav-link${isActive('/journals') ? ' active' : ''}`} href="/journals">Article Reader</a></li>
          <li className="nav-item"><a className={`nav-link${isActive('/journals_summaries') ? ' active' : ''}`} href="/journals_summaries">Journal Library</a></li>
          <li className="nav-item"><a className={`nav-link${isActive('/dashboard') ? ' active' : ''}`} href="/dashboard">Dashboard</a></li>
          <li className="nav-item"><a className={`nav-link${isActive('/notes') ? ' active' : ''}`} href="/notes">Notes</a></li>
          <li className="nav-item"><a className={`nav-link${isActive('/about') ? ' active' : ''}`} href="/about">About</a></li>
          {
            userId && token
              ? <li className="nav-item"><a className="btn btn-outline" href="/logout">Logout</a></li>
              : <>
                  <li className="nav-item"><a className="btn btn-outline" href="/login">Login</a></li>
                  <li className="nav-item"><a className={`nav-link${isActive('/register') ? ' active' : ''}`} href="/register">Register</a></li>
                </>
          }
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
