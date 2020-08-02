import React from 'react';

import './button.scss';

export default function Button ({className, btnContent,onClick, ...props}){
  return(
    <button className={`button ${className}`} onClick={onClick}>{props.children}</button>
  )
}

