import React from 'react';

import * as string from '../constants/string';
import { TOP_STORIES } from '../constants/url';
import fetchContent from '../services/hackernewsApi';

import '../components/common/loader/loader.scss';

/**
 * Creates a new component with predefined container.
 *
 * @param {Component} Component
 * @returns {Component} New componnet containing with given component inside it.
 */
function withStoriesContainer(Component) {

  /**
   * New Component that wraps a component with stories Container.
   *
   * @class WrappedComponent
   * @augments {React.Component}
   */
  class WrappedComponent extends React.Component {

    /**
     * Creates an instance of WrappedComponent.
     *
     * @memberof WrappedComponent
     */
    constructor() {
      super();
      this.state = {
        isLoading: true,
        items: [],
        error: false
      };
    }

    /**
     * Fetches the stories and changes the stae items.
     *
     * @returns {undefined} If an error occurs undefined is returned.
     * @memberof WrappedComponent
     */
    async getStories() {
      const result = await fetchContent(TOP_STORIES);

      if (!result) {
        this.setState({
          error: true
        });

        return;
      }
      if (!result.error) {
        this.setState({
          items: result,
          isLoading: false
        });
      }
    }

    /**
     * Calls fucntion to get stories when the component mounts.
     *
     * @memberof WrappedComponent
     */
    componentDidMount() {
      this.getStories();
    }

    /**
     * Renders the component if there is no error during fetching.
     *
     * @returns {JSX} JSX for storiesContainer.
     * @memberof WrappedComponent
     */
    render() {
      if (this.state.error) {
        return (
          <p className="firstFetchLoadP">
            {string.FETCH_ERROR}
          </p>
        );
      }

      return (
        <div>
          {this.state.isLoading ? <div className="loader center">Loading...</div> : <Component items={this.state.items} />}
        </div>
      );
    }
  }

  return WrappedComponent;
}

export default withStoriesContainer;
