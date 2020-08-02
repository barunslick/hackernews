import React from 'react';
import { TOP_STORIES } from '../constants/url';
import fetchContent from '../services/hackernewsApi';

function withStoriesContainer(Component) {

  return class WrappedComponent extends React.Component {

    constructor() {
      super();
      this.state = {
        isLoading: true,
        showLoadingText: 'Getting your stories...',
        items: []
      }
    }

    async getStories() {
      let result = await fetchContent(TOP_STORIES);
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
      return (
        <div>
          {this.state.isLoading ? <p className="firstFetchLoadP">{this.state.showLoadingText} </p> : <Component items={this.state.items} />}
        </div>
      )
    }
  }
}

export default withStoriesContainer;