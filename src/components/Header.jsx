import { Link } from "react-router";

export const Header = () => {
  return (
    <header className="header">
      <Link to="/">
        <h1>NC News</h1>
      </Link>
      <nav>
        <Link to="/" className="navbar-link">
          Articles
        </Link>
      </nav>
    </header>
  );
};
