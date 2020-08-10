import React from 'react';

import PropTypes from 'prop-types';

import './button.scss';

/**
 * Creates a button with the given className and onClick event.
 *
 * @param {Object} props
 * @returns {JSX} A button jsx element.
 */
function Button (props) {

  const { className, onClick } = props;

  return(
    <button className={`button ${className}`} onClick={onClick}>{props.children}</button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.any,
};

export default Button;

