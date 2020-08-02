import React from 'react';
import '../style/Components/Modal/Modal.scss';

function withModal(Component) {

  return class WrappedComponent extends React.Component {

    closeModal = () => {
      this.props.history.goBack();
    }
    
    render() {
      return (
        <>
          <div className="StoryModal">
            <Component {...this.props} />
          </div>
          <div className="StoryModal-background" onClick={this.closeModal}></div>
        </>
      )
    }
  }
}

export default withModal;