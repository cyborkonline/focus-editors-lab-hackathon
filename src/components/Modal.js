import React, { Component } from 'react';
import Appbar from 'muicss/lib/react/appbar';
import Divider from 'muicss/lib/react/divider';
import PropTypes from 'prop-types';
import Timeline from './Timeline';
import Home from './Home';

export default class ModalContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLogged: localStorage.focusAppLogin || false,
    };
    this.modalId = props.modalRegionId;
    this.modalRegionName = props.modalRegionName;
  }
  componentDidMount() {
    // this.generateSignInButton();
  }

/*
  generateSignInButton() {
    this.setState({
      gSignIn: (<div
        id="google-signin-button"
        className="g-signin2"
        data-width="170"
        data-height="30"
        data-onsuccess="onSignIn"
        data-onfailure="onSignInFailure"
      />),
    });
  }
  */


  render() {
    return (
      <div className="Modal">
        <Appbar className="mui--bg-color-light-green-200">
          <h5>{this.modalRegionName}</h5>
        </Appbar>
        <div className="ModalContent">
          <Appbar className="mui--bg-color-light-green-100">
            <h5>Stories from {this.modalRegionName}</h5>
          </Appbar>
          <Timeline
            regionId={this.modalId || 0}
          />
        </div>
        <Divider />
        <div className="ModalContent">
          <Appbar className="mui--bg-color-light-green-100">
            <h5>Available Homes in {this.modalRegionName}</h5>
          </Appbar>
          <Home
            regionId={this.modalId || 0}
          />
        </div>
      </div>
    );
  }
}

ModalContent.propTypes = {
  modalRegionId: PropTypes.number.isRequired,
  modalRegionName: PropTypes.string.isRequired,
};
