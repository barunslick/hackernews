import React from 'react';

import './StoryModal.scss';

export function StoryModal(props) {
  function closeModal() {
    props.history.push('/');
  }
  const itemId = props.match.params.id;
  return (
    <div>
      <div className="StoryModal">
        My Modal{itemId}
      </div>
      <div class="StoryModal-background" onClick={closeModal}></div>
    </div>
  )
}

export default StoryModal;
