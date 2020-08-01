import React from 'react';
/* import { ITEM } from '../../../constants/url';
import fetchContent from '../../../services/hackernewsApi'; */

import './StoryListItem.scss';

export class StoryListItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      content: {}
    }
  }

  /* async getStories() {
    let storyUrl = `${ITEM + this.props.itemId}.json`
    let result = await fetchContent(storyUrl);
    console.log(result)
    this.setState({
      content: result,
      isLoading: false
    })
  }

  componentDidMount() {
    this.getStories();
  }
 */

  render() {
    return (
      <div className="ListItem">

      </div>
    )
  }
}

export default StoryListItem;
