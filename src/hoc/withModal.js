import React from 'react';
import '../style/Components/Modal/Modal.scss';
import Button from '../components/Common/Button';

function withModal(Component) {

  return class WrappedComponent extends React.Component {

    closeModal = () => {
      this.props.history.goBack();
    }
    
    render() {
      return (
        <>
          <div className="Modal">
            <Button className="Modal__closeButton" onClick={this.closeModal}>&times;</Button>
            <Component {...this.props} />
          </div>
          <div className="Modal-background" onClick={this.closeModal}></div>
        </>
      )
    }
  }
}

export default withModal;