import React from 'react';

import { HashRouter as Router, Route } from 'react-router-dom';

import Header from './components/header';
import * as routeUrls from './constants/routeUrl';
import withStoriesContainer from './hoc/withStoriesContainer';
import FullStoryView from './components/Stories/fullStoryView';
import StoriesContainer from './components/Stories/storiesContainer';

import './style/base.scss';
import './style/reset.scss';
import './style/style.scss';

const EnhancedStoriesContainer = withStoriesContainer(StoriesContainer);

/**
 * Main App component. Contains Route paths and header components.
 *
 * @returns {JSX} JSX for main app wrapper.
 */
function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="Container">
          <Route path={routeUrls.BASE} component={EnhancedStoriesContainer} />
          <Route path={routeUrls.STORY} component={FullStoryView} />
        </div>
      </div>
    </Router>
  );
}

export default App;
