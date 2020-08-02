import React from 'react';
import Comment from '../../Comment';
import { ITEM, USER_PROFILE } from '../../../constants/url';
import mapTimeOfUpload from '../../../utilites/mapTimeOfUpload';

import './FullStoryView.scss';
import '../../Common/Loader/loader.scss';

export class FullStoryView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      kids: [],
      title: '',
      result: {},
    }

    //Abort Controller is an experimental feature and doesnt work on IE.
    //Use Axios for better handling. I am using this to be familiar with the Api.
    this.controller = new AbortController();
    this.storyId = this.props.match.params.id;
  }

  async getComments() {

    let storyUrl = `${ITEM + this.storyId}.json`;

    try {
      //fetch is used here instead of calling hackernewsApi.js, so that we can abort the call easily when the component unmounts
      let result = await fetch(storyUrl, { signal: this.controller.signal })
        .then(response => response.json())
        .then(data => data);

      this.setState({
        kids: result.kids,
        title: result.title,
        result: result,
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

    return (
      <div className="FullStoryView">
        {this.state.isLoading ? <div className="loader center">Loading...</div>: 
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
    )
  }
}

export default FullStoryView;
