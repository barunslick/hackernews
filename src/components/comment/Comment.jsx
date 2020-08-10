import React from 'react';

import PropTypes from 'prop-types';

import CommentCard from './commentCard';
import { ITEM } from '../../constants/url';
import * as string from '../../constants/string';

import './comment.scss';
import '../common/loader/loader.scss';

/**
 * Class Component for displaying comments of a given story.
 *
 * @class Comment
 * @augments {React.Component}
 */
class Comment extends React.Component {

  /**
   *Creates an instance of Comment.
   *
   * @param {Object} props
   * @memberof Comment
   */
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      content: {},
      error: false
    };

    this.commentId = this.props.commentId;
  }

  /**
   * Fetches the comment from the commentId and sets the content state.
   *
   * @returns {undefined} Returns undefined if error occurs.
   * @memberof Comment
   */
  async getComments() {

    const commentUrl = `${ITEM + this.commentId}.json`;

    // Fetch is used here instead of calling hackernewsApi.js, so that we can abort the call easily when the component unmounts
    const result = await fetch(commentUrl, { signal: this.controller.signal })
      .then(response => response.json())
      .then(data => data)
      .catch( () => {
        return null;
      });

    if (this.controller.signal.aborted) {
      return;
    }

    if (!result) {
      this.setState({
        error: true
      });

      return;
    }

    this.setState({
      content: result,
      isLoading: false
    });
  }

  /**
   * Creates an abort controller for API fetch and calls function to get comments.
   *
   * @memberof Comment
   */
  componentDidMount() {
    // Abort Controller is an experimental feature and doesnt work on IE.
    // Use Axios for better handling. I am using this to be familiar with the Api.
    this.controller = new AbortController();
    this.getComments();
  }

  /**
   * Aborts the fetch call if it is still fetching when the component unmounts.
   *
   * @memberof Comment
   */
  componentWillUnmount() {
    if (this.controller) {
      this.controller.abort();
    }
  }

  /**
   * Renders the comment component.
   *
   * @returns {JSX} Returns JSX for comment section if there is no fetch error or not loading.
   * @memberof Comment
   */
  render() {

    if (this.state.error) {
      return (
        <div className='Comment'>
          {string.COMMENT_ERROR}
        </div>
      );
    }

    const { by, time, text, kids = [] } = this.state.content || {};

    return (
      <>
        {this.state.isLoading ?
          <div className='Comment'>
            <CommentCard isLoading={true} />
          </div>
          :
          <div className='Comment'>
            <CommentCard isLoading={false} by={by} time={time} text={text} />
            {(kids).map(comment => (
              <Comment key={comment} commentId={comment} type="child" />
            ))
            }
          </div>
        }
      </>
    );
  }
}

Comment.propTypes = {
  commentId: PropTypes.number,
};

export default Comment;
