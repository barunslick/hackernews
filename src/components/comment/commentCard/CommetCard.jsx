import React from 'react';

import PropTypes from 'prop-types';

import { USER_PROFILE } from '../../../constants/url';
import mapTimeOfUpload from '../../../utils/mapTimeOfUpload';

import './commentCard.scss';
import '../../common/loader/loader.scss';

/**
 * A card component for single comment.
 *
 * @param {Object} props
 * @returns {JSX} Returns a commentCard jsx with given comment text.
 */
function CommentCard(props) {

  const { by, time, text, isLoading } = props;

  
  if (isLoading) {
    return (
      <div className="CommentCard__sub-content">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  if (!by) {
    return null;
  }

  return (
    <div className="CommentCard__sub-content">
      <div className="CommentCard__header">
        <a className="CommentCard__username" href={`${USER_PROFILE + by}`}><span dangerouslySetInnerHTML={{ __html: by }} ></span></a>
        <span>&middot;</span>
        <span className="CommentCard__time">{mapTimeOfUpload(time)}</span>
      </div>
      <p className="CommentCard__textContent" dangerouslySetInnerHTML={{ __html: text }}></p>
    </div>
  );
}

CommentCard.propTypes = {
  by: PropTypes.string,
  time: PropTypes.number,
  text: PropTypes.string,
  isLoading: PropTypes.bool,
};

export default CommentCard;
