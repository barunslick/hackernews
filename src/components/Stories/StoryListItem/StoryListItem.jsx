import React from 'react';
import { Link } from 'react-router-dom';
import { ITEM, USER_PROFILE } from '../../../constants/url';
import mapTimeOfUpload from '../../../utilites/mapTimeOfUpload';

import './StoryListItem.scss';
import '../../Common/Loader/loader.scss';

export class StoryListItem extends React.Component {

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
  }

  async getStories() {

    let storyUrl = `${ITEM + this.props.itemId}.json`;

    //fetch is used here instead of calling hackernewsApi.js, so that we can abort the call easily when the component unmounts
    let result = await fetch(storyUrl, { signal: this.controller.signal })
      .then(response => response.json())
      .then(data => data)
      .catch(_ => {return null});
    
    //when component is unmounted, check abort signal
    if (this.controller.signal.aborted) return;

    if (result === null){
      this.setState({
        error: true
      })

      return;
    }

    this.setState({
      content: result,
      isLoading: false,
      error: false
    })

    this.props.updateCacheData(result);
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

    if (this.state.error) return(
      <div className="StoryLisItem">
        Can't get your stories
      </div>
    )

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
