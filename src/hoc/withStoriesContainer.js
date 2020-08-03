import React from 'react';
import { TOP_STORIES } from '../constants/url';
import fetchContent from '../services/hackernewsApi';

import '../components/Common/Loader/loader.scss';

function withStoriesContainer(Component) {

  return class WrappedComponent extends React.Component {

    constructor() {
      super();
      this.state = {
        isLoading: true,
        items: [],
        error: false
      }
    }

    async getStories() {
      let result = await fetchContent(TOP_STORIES);
      if (result === null){
        this.setState({
          error: true
        })
        return;
      }
      if (result.error) {
        this.setState({
          showLoadingText: 'We seem to have problem connecting to Hackernews. Try again later.(Bad URL)',
        })
      }else{
        this.setState({
          items: result,
          isLoading: false
        })
      }
    }

    componentDidMount() {
      this.getStories();
    }

    render() {
      if (this.state.error) {
        return (
          <p className="firstFetchLoadP">
            Cant connect with hackernews right now.
          </p>
        )
      }
      return (
        <div>
          {this.state.isLoading ? <div className="loader center">Loading...</div> : <Component items={this.state.items} />}
        </div>
      )
    }
  }
}

export default withStoriesContainer;