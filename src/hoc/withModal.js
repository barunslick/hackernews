import React from 'react';

import PropTypes from 'prop-types';

import Button from '../components/common/button';

import '../style/components/modal/Modal.scss';

/**
 * Displays the given component inside Modal.
 *
 * @param {Component} Component
 * @returns {Component} New Component that is wrapped inside modal.
 */
function withModal(Component) {

  /**
   * New class component that is wrapping given component.
   *
   * @class WrappedComponent
   * @augments {React.Component}
   */
  class WrappedComponent extends React.Component {

    closeModal = () => {
      this.props.history.goBack();
    }
    
    /**
     * Renders the component with Modal.
     *
     * @returns {JSX} New component wrapped with Modal Class.
     */
    render() {
      return (
        <>
          <div className="Modal">
            <Button className="Modal__closeButton" onClick={this.closeModal}>&times;</Button>
            <Component {...this.props} />
          </div>
          <div className="Modal-background" onClick={this.closeModal}></div>
        </>
      );
    }

  }

  WrappedComponent.propTypes = {
    history: PropTypes.object,
  };

  return WrappedComponent;

}


export default withModal;
