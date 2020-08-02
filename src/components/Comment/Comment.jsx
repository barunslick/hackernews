import React from 'react';
import CommentCard from './CommentCard';
import { ITEM } from '../../constants/url';

import './Comment.scss';

export class Comment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      content: {}
    }
    this.controller = new AbortController();
    this.commentId = this.props.commentId;
  }

  async getComments() {
    let storyUrl = `${ITEM + this.commentId}.json`;
    try {
      //fetch is used here instead of calling hackernewsApi.js, so that we can abort the call easily when the component unmounts
      let result = await fetch(storyUrl, { signal: this.controller.signal })
        .then(response => response.json())
        .then(data => data);
      this.setState({
        content: result,
        isLoading: false
      })
    } catch (error) {
      return;
    }
  }

  componentDidMount() {
    this.getComments();
  }

  componentWillUnmount() {
    this.controller.abort();
  }

  render() {
    const { by, time, text, kids } = this.state.content;
    return (
      <>
        {this.state.isLoading ? '' :
          <div className='Comment'>
            <CommentCard by={by} time={time} text={text} />
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
