import React from 'react';
import { Link } from 'react-router-dom';
import { ITEM, USER_PROFILE } from '../../../constants/url';
import mapTimeOfUpload from '../../../utilites/mapTimeOfUpload';
/* import fetchContent from '../../../services/hackernewsApi'; */

import './StoryListItem.scss';
import '../../Common/Loader/loader.scss';

export class StoryListItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      content: {}
    }

    //Abort Controller is an experimental feature and doesnt work on IE.
    //Use Axios for better handling. I am using this to be familiar with the Api.
    this.controller = new AbortController();
  }

  async getStories() {
    let storyUrl = `${ITEM + this.props.itemId}.json`;

    try {
      //fetch is used here instead of calling hackernewsApi.js, so that we can abort the call easily when the component unmounts
      let result = await fetch(storyUrl, { signal: this.controller.signal })
        .then(response => response.json())
        .then(data => data);
      this.setState({
        content: result,
        isLoading: false
      })

      this.props.updateCacheData(result);
    } catch (error) {
      return;
    }
  }

  componentDidMount() {
    if (this.props.cachedData === null) {
      this.getStories();
    } else {
      this.setState({
        content: this.props.cachedData,
        isLoading: false
      })
    }
  }

  componentWillUnmount() {
    this.controller.abort();
  }

  render() {
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

    )
  }
}

export default StoryListItem;
