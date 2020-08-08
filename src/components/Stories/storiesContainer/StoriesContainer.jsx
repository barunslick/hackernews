import React from 'react';

import PropTypes from 'prop-types';

import StoryListItem from '../storyListItem';
import List from 'react-virtualized-listview';

import './storiesContainer.scss';

const listStyle = {
  item: {
    padding: 10,
    boxSizing: 'border-box',
  }
};

/**
 * Wrapper for holding all the list items displaying stories.
 *
 * @param {Object} props
 * @returns
 */
function StoriesContainer(props) {

  const data = [...props.items];

  const cachedData = {};

  /**
   * Store the given fetched value as an caching mechanism.
   *
   * @param {Object} item Fetched Item from an api.
   */
  function updateCacheData(item) {
    const { id } = item;

    cachedData[id] = item;
  }

  return (
    <div className="StoriesContainer">
      <List
        source={data}
        rowHeight={100}
        renderItem={({ index, style }) => (
          <div key={index} style={{ ...listStyle.item, ...style }}>
            <StoryListItem key={index} itemId={data[index]} updateCacheData={updateCacheData} cachedData={cachedData.hasOwnProperty(data[index]) ? cachedData[data[index]] : null} />
          </div>
        )}
      />
    </div>
  );
}

StoriesContainer.propTypes = {
  items: PropTypes.array,
};

export default StoriesContainer;
