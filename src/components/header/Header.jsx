import React from 'react';

import { Link } from 'react-router-dom';

import './header.scss';

/**
 * Returns the header sectiion of webpage.
 *
 * @returns {JSX} Returns the header section.
 */
function Header() {
  return (
    <div className="Header">
      <div className="Header__container">
        <h1>
          <Link to='/'> Hackernews</Link>
        </h1>
      </div>
    </div>
  );
}

export default Header;
