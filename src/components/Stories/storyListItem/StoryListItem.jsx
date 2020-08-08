import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import * as string from '../../../constants/string';
import { ITEM, USER_PROFILE } from '../../../constants/url';
import mapTimeOfUpload from '../../../utils/mapTimeOfUpload';

import './storyListItem.scss';
import '../../common/loader/loader.scss';

/**
 * Template for defining list of stories.
 *
 * @class StoryListItem
 * @augments {React.Component}
 */
class StoryListItem extends React.Component {

  /**
   *Creates an instance of StoryListItem.
   *
   * @param {Object} props
   * @memberof StoryListItem
   */
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      content: {},
      error: false,
    };
  }

  /**
   * Returns the fetched content details from a given storyId.
   *
   * @returns {undefined}
   * @memberof StoryListItem
   */
  async getStories() {

    const storyUrl = `${ITEM + this.props.itemId}.json`;

    // Fetch is used here instead of calling hackernewsApi.js, so that we can abort the call easily 
    // when the component unmounts.

    const result = await fetch(storyUrl, { signal: this.controller.signal })
      .then(response => response.json())
      .then(data => data)
      .catch( () => {
        return null;
      });

    // When component is unmounted, check abort signal
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
      isLoading: false,
      error: false
    });

    this.props.updateCacheData(result);
  }

  /**
   * Fetches story when component is mounted.
   *
   * @memberof StoryListItem
   */
  componentDidMount() {
    if (this.props.cachedData === null) {
      // Abort Controller is an experimental feature and doesnt work on IE.
      // Use Axios for better handling. I am using this to be familiar with the Api.
      this.controller = new AbortController();
      this.getStories();
    } else {
      this.setState({
        content: this.props.cachedData,
        isLoading: false
      });
    }
  }

  /**
   * Aborts the fetch request when component unmounts.
   *
   * @memberof StoryListItem
   */
  componentWillUnmount() {
    if(this.controller) {
      this.controller.abort();
    }
  }

  /**
   * Returns the list item JSX if no error occurs during fetching.
   *
   * @returns {JSX} JSX for single list item.
   * @memberof StoryListItem
   */
  render() {

    if (this.state.error) {
      return (
        <div className="StoryLisItem">
          {string.STORIES_ERROR}
        </div>
      );
    }

    const { title, by } = this.state.content || {};

    return (
      <div className="StoryLisItem">
        {
          this.state.isLoading ?
            <div className="loader">Loading...</div>
            : (
              <>
                <p className="StoryLisItem__title">
                  <Link to={{
                    pathname: `/story/${this.state.content.id}`
                  }}>
                    {title}
                  </Link></p>
                <p className="StoryLisItem__details">
                  <span className="StoryLisItem__author">By: <a href={USER_PROFILE + by}>{by}</a>
                  </span>
                  <span className="StoryLisItem__time">
                    {mapTimeOfUpload(this.state.content.time)} ago
                  </span>
                </p>
              </>
            )
        }
      </div>
    );
  }
}

StoryListItem.propTypes = {
  itemId: PropTypes.number,
  cachedData: PropTypes.object,
  updateCacheData: PropTypes.func,
};

export default StoryListItem;
