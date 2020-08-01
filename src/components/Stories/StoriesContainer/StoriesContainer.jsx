import React from 'react';
import List from 'react-virtualized-listview';
import './StoriesContainer.scss';
import StoryListItem from '../StoryListItem';

const listStyle = {
  item: {
    padding: 10,
    boxSizing: "border-box",
    borderBottom: "1px solid #073642",
  }
};

class StoriesContainer extends React.Component {

  constructor(props) {
    super(props)
    this.data = [...props.items];
    this.cachedData = {};
  }

  updateCacheData= (item)=> {
    const { id } = item;
    this.cachedData[id] = item;
  }

  render() {
    return (
      <div className="StoriesContainer">
        <List
          source={this.data}
          rowHeight={80}
          renderItem={({ index, style }) => (
            <div key={index} style={{ ...listStyle.item, ...style }}>
              <StoryListItem key={index} itemId={this.data[index]} updateCacheData={this.updateCacheData} cachedData={this.cachedData.hasOwnProperty(this.data[index]) ? this.cachedData[this.data[index]] : null} />
            </div>
          )}
        />
      </div>
    )
  }
}

export default StoriesContainer;