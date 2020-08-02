import React from 'react';

export class FullStoryView extends React.Component {

  render() {
    const storyId = this.props.match.params.id;
    return (
      <div>
        {storyId}
      </div>
    )
  }
}

export default FullStoryView;
