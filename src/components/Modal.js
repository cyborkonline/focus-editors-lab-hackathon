import React, { Component } from 'react';
import PropTypes from 'prop-types';
import users from '../dev/users.json';
import homes from '../dev/homes.json';
import Appbar from 'muicss/lib/react/appbar';

const data = { users, homes };

export default class ModalContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLogged: localStorage.focusAppLogin || false,
    };
    this.modalId = props.modalRegionId;
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
    const LoginButton = this.state.userLogged ?
    '' : (
      <span
        role="button"
        tabIndex="-1"
        className="login-button"
        onClick={() => {
          this.setState({
            userLogged: true,
          });
          localStorage.focusAppLogin = true;
        }}
      > Login
      </span>
    );
    return (
      <div className="Modal">
        <Appbar className="mui--bg-color-light-green-100">
          <h5>{LoginButton}</h5>
        </Appbar>
        <div className="ModalContent">
          We got some stuff in here
        </div>
      </div>
    );
  }
}

ModalContent.propTypes = {
  modalRegionId: PropTypes.number.isRequired,
};
