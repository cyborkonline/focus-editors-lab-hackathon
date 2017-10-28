import React, { Component } from 'react';

export default class LoginButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLogged: localStorage.focusAppLogin || false,
    };
  }

  render() {
    return (
      <span
        role="button"
        tabIndex="-1"
        className="login-button"
        onClick={() => {
          this.setState({
            userLogged: this.state.userLogged === 'true' ? 'false' : 'true',
          });
          localStorage.focusAppLogin = this.state.userLogged;
        }}
      > {localStorage.focusAppLogin === 'true' ? 'Sign Out' : 'Login'}
      </span>);
  }
}
