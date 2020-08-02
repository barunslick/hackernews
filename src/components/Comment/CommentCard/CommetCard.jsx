import React from 'react';

import { USER_PROFILE } from '../../../constants/url';
import mapTimeOfUpload from '../../../utilites/mapTimeOfUpload';

import './CommentCard.scss';
import '../../Common/Loader/loader.scss';

function CommetCard(props) {

  const { by, time, text, isLoading} = props;

  
  if (isLoading)
  {
    return (
      <div className="CommentCard__sub-content">
        <div className="loader">Loading...</div>
      </div>
    )
  }

  if (by === undefined){
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
  )
}

export default CommetCard;
