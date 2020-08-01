import React from 'react';
import Header from './components/Header/index';
import withStoriesContainer from './hoc/withStoriesContainer';
import { HashRouter as Router, Route } from 'react-router-dom';
import StoryModal from './components/Stories/StoryModal';
import StoriesContainer from './components/Stories/StoriesContainer';

import './App.scss';
import './style/base.scss';
import './style/reset.scss';
import './style/style.scss';

let EnhancedStoriesContainer = withStoriesContainer(StoriesContainer);

function App() {

    return (
      <Router>
        <div className="App">
          <Header />
          <div className="Container">
            <Route path='/' component={EnhancedStoriesContainer} />
            <Route path='/story/:id' component={StoryModal}/>
          </div>
        </div>
      </Router>
    )
}

export default App;
