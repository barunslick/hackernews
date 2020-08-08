import React from 'react';

import PropTypes from 'prop-types';

import Comment from '../../comment';
import * as string from '../../../constants/string';
import { ITEM, USER_PROFILE } from '../../../constants/url';
import mapTimeOfUpload from '../../../utils/mapTimeOfUpload';

import './fullStoryView.scss';
import '../../common/loader/loader.scss';

/**
 * Class for displaying the story in detail in modal when user clicks the story list.
 *
 * @class FullStoryView
 * @augments {React.Component}
 */
class FullStoryView extends React.Component {

  /**
   * Creates an instance of FullStoryView.
   *
   * @param {Object} props
   * @memberof FullStoryView
   */
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      kids: [],
      title: '',
      result: {},
      error: false
    };
    this.storyId = this.props.match.params.id;
  }

  /**
   * Fetches the story comments and sets the result state.
   *
   * @returns {undefined} Undefined is returned if error occurs, else changes state.
   * @memberof FullStoryView
   */
  async getComments() {

    const storyUrl = `${ITEM + this.storyId}.json`;

    // Fetch is used here instead of calling hackernewsApi.js, so that we can abort the call easily when the component unmounts.
    const result = await fetch(storyUrl, { signal: this.controller.signal })
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
      kids: result.kids,
      title: result.title,
      result: result,
      isLoading: false
    });
  }

  /**
   * Creates and abort controller and calls getComments when component is mounted. 
   *
   * @memberof FullStoryView
   */
  componentDidMount() {
    // Abort Controller is an experimental feature and doesnt work on IE.
    // Use Axios for better handling. I am using this to be familiar with the Api.
    this.controller = new AbortController();
    this.getComments();
  }

  /**
   * Aborts the fetch call when the component unmounts, if it is still fetching.
   *
   * @memberof FullStoryView
   */
  componentWillUnmount() {
    if (this.controller) {
      this.controller.abort();
    }
  }

  /**
   * Renders the Story if no error occurs during fetching.
   *
   * @returns {JSX} 
   * @memberof FullStoryView
   */
  render() {

    if (this.state.error) {
      return (
        <div className="FullStoryView">
          {string.FETCH_ERROR}
        </div>
      );
    }

    return (
      <div className="FullStoryView">
        {this.state.isLoading ? <div className="loader center">Loading...</div> :
          <>
            <div className="FullStoryView__header">

              <h2><a href={this.state.result.url || '#'}>{this.state.title}</a></h2>

              <div className="FullStoryView__details">
                <span className="FullStoryView__username" ><span className="gray">By: </span><a href={USER_PROFILE + this.state.result.by}>{this.state.result.by}</a></span>
                <span>&middot;</span>
                <span><span className="gray">Score: </span>{this.state.result.score} </span>
                <span>&middot;</span>
                <span>{mapTimeOfUpload(this.state.result.time)} ago</span>
              </div>

            </div>
            <div className="FullStoryView__comment">
              <h3 className="FullStoryView__comment-header">Comments</h3>
              {(this.state.kids || []).map((commentId) => (<Comment key={commentId} commentId={commentId} />))}
            </div>
          </>
        }
      </div>
    );
  }
}

FullStoryView.propTypes = {
  match: PropTypes.object,
};

export default FullStoryView;
