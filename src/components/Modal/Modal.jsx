import React from 'react';

import './Modal.scss';

export function Modal(props) {

  function closeModal() {
    props.history.goBack();
  }

  const itemId = props.match.params.id;
  
  console.log(this.props)
  return (
    <>
      <div className="StoryModal">
        My Modal
      </div>
      <div className="StoryModal-background" onClick={closeModal}></div>
    </>
  )
}

export default Modal;
