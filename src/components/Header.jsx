import { Link } from "react-router-dom";

import marvelLogo from "../assets/images/marvel-logo.svg";

import "../assets/styles/header.css";

const Header = () => {
  return (
    <header>
      <div className="header-container">
        <nav className="header-nav">
          <ul>
            <Link to="/characters">
              <li>Characters</li>
            </Link>
            <Link to="/comics">
              <li>Comics</li>
            </Link>
            <Link to="/">
              <img src={marvelLogo} alt="Marvel logo" />
            </Link>
            <Link>
              <li>Favorites</li>
            </Link>
            <Link>
              <li>Connection</li>
            </Link>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
