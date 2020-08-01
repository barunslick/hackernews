import React from 'react';
import { TOP_STORIES } from '../constants/url';
import fetchContent from '../services/hackernewsApi';

function withStoriesContainer(Component) {

  return class WrappedComponent extends React.Component{

    constructor() {
      super();
      this.state = {
        isLoading: true,
        items: []
      }
    }

    async getStories() {
      let result = await fetchContent(TOP_STORIES);
      this.setState({
        items: result,
        isLoading: false
      })
    }

    componentDidMount() {
      this.getStories();
    }

    render() {
      return (
        <div>
          { this.state.isLoading ? <p>Laoding...</p> : <Component items = {this.state.items}/>}
        </div>
      )
    }
  }
}

export default withStoriesContainer;