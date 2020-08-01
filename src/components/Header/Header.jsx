import React from 'react';
import './Header.scss';
import {Link} from 'react-router-dom';

export function Header (){
  return (
    <div className="Header">
      <div className="Header__container">
        <h1>
          <Link to='/'> Hackernews</Link>
          </h1>
      </div>  
    </div>
  )
}

export default Header;