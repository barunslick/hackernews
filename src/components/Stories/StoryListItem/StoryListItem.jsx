import React from 'react';
import { ITEM } from '../../../constants/url';
import fetchContent from '../../../services/hackernewsApi';
import {Link} from 'react-router-dom';

import './StoryListItem.scss';


export class StoryListItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      content: {}
    }
  }

  async getStories() {
    let storyUrl = `${ITEM + this.props.itemId}.json`
    let result = await fetchContent(storyUrl);
    this.setState({
      content: result,
      isLoading: false
    })
    this.props.updateCacheData(result);
  }

  componentDidMount() {
    if (this.props.cachedData === null){
      this.getStories();
    }else{
      this.setState({
        content: this.props.cachedData,
        isLoading: false
      })
    }
  }

  render() {
    const { title, by } = this.state.content || '';
    return (
      <div className="StoryLisItem">
        {
          this.state.isLoading ? (<p>Loading...</p>) : (
            <>
              <p className="StoryLisItem__title"><Link to={`/story/${this.state.content.id}`}>{title}</Link></p>
              <p className="StoryLisItem__author">By: {by}</p>
            </>
          )
        }
      </div>

    )
  }
}

export default StoryListItem;
