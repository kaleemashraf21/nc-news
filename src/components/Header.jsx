import { Link } from "react-router";

export const Header = () => {
  return (
    <header className="header">
      <Link to="/">
        <h1>NC News</h1>
      </Link>
      <nav className="navbar">
        <Link to="/" className="navbar-link">
          Articles
        </Link>
        <Link to="/topics" className="navbar-link">
          Topics
        </Link>
      </nav>
    </header>
  );
};
