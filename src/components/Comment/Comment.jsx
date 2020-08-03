import React from 'react';
import CommentCard from './CommentCard';
import { ITEM } from '../../constants/url';

import './Comment.scss';
import '../Common/Loader/loader.scss';

export class Comment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      content: {},
      error: false
    }

    //Abort Controller is an experimental feature and doesnt work on IE.
    //Use Axios for better handling. I am using this to be familiar with the Api.
    this.controller = new AbortController();
    this.commentId = this.props.commentId;
  }

  async getComments() {

    let commentUrl = `${ITEM + this.commentId}.json`;

    //fetch is used here instead of calling hackernewsApi.js, so that we can abort the call easily when the component unmounts
    let result = await fetch(commentUrl, { signal: this.controller.signal })
      .then(response => response.json())
      .then(data => data)
      .catch(_ => { return null });

    if (this.controller.signal.aborted) return;

    if (result === null) {
      this.setState({
        error: true
      })

      return;
    }

    this.setState({
      content: result,
      isLoading: false
    })
  }

  componentDidMount() {
    this.getComments();
  }

  componentWillUnmount() {
    this.controller.abort();
  }

  render() {

    if (this.state.error) return (
      <div className='Comment'>
        Cant fetch comment.
      </div>
    )
    const { by, time, text, kids } = this.state.content || {};
    return (
      <>
        {this.state.isLoading ?
          <div className='Comment'>
            <CommentCard isLoading={true} />
          </div>
          :
          <div className='Comment'>
            <CommentCard isLoading={false} by={by} time={time} text={text} />
            {(kids || []).map(comment => (
              <Comment key={comment} commentId={comment} type="child" />
            ))
            }
          </div>
        }
      </>
    )
  }
}

export default Comment;
