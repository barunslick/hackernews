import React from 'react';

import { USER_PROFILE } from '../../../constants/url';
import mapTimeOfUpload from '../../../utilites/mapTimeOfUpload';

import './CommentCard.scss';

function CommetCard(props) {

  const { by, time, text } = props;

  return (
    <div className="CommentCard__sub-content">
      <div className="CommentCard__header">
        <a className="CommentCard__username" href={`${USER_PROFILE + by}`}><span dangerouslySetInnerHTML={{ __html: by }} ></span></a>
        <span>&middot;</span>
        <span className="CommentCard__time">{mapTimeOfUpload(time)}</span>
      </div>
      <p className="Comment__text" dangerouslySetInnerHTML={{ __html: text }}></p>
    </div>
  )
}

export default CommetCard;
