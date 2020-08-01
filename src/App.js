import React from 'react';
import Header from './components/Header/index';
import withStoriesContainer from './hoc/withStoriesContainer';
import StoriesContainer from './components/Stories/StoriesContainer';

import './App.scss';
import './style/base.scss';
import './style/reset.scss';
import './style/style.scss';

let EnhancedStoriesContainer = withStoriesContainer(StoriesContainer);

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <Header />
        <div className="Container">
          <EnhancedStoriesContainer />
        </div>
      </div>
    )
  }
}

export default App;
