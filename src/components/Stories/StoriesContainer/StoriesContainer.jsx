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

function StoriesContainer(props) {

  const data = [...props.items];
  let cachedData = {};

  function updateCacheData(item) {
    const { id } = item;
    cachedData[id] = item;
  }

  return (
    <div className="StoriesContainer">
      <List
        source={data}
        rowHeight={80}
        renderItem={({ index, style }) => (
          <div key={index} style={{ ...listStyle.item, ...style }}>
            <StoryListItem key={index} itemId={data[index]} updateCacheData={updateCacheData} cachedData={cachedData.hasOwnProperty(data[index]) ? cachedData[data[index]] : null} />
          </div>
        )}
      />
    </div>
  )
}

export default StoriesContainer;