import { Link } from "react-router";

export const Header = () => {
  return (
    <header className="header">
      <Link to="/articles">
        <h1>NC News</h1>
      </Link>
      <nav className="navbar">
        <Link to="/articles" className="navbar-link">
          Articles
        </Link>
        <Link to="/topics" className="navbar-link">
          Topics
        </Link>
      </nav>
    </header>
  );
};
