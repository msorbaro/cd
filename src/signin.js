/* eslint no-alert: 0 */
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Input } from 'reactstrap';
import firebase from 'firebase';
import logo from './calendar.png';
import { NavLink, withRouter } from 'react-router-dom';

import './signin.css';

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  onPasswordChange= (event) => {
    this.setState({ password: event.target.value });
  }

  handleSigninButtonClick = (event) => {
    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
      alert(error);
    });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.history.push('/');
      }
    });
  }

  handleCancelButtonClick = (event) => {
    this.props.history.push('/');
  }

  render() {
    return (
    <div className="all">
      <div className="dartCalLogo">
        DartCal
        <div className="scheduleLogo"><img width="90px" src={logo}/></div>
      </div>
      <div className="logininfo">
        <div className="inputline">
          Username: 
          <Input className="response" id="emailInputBar" placeholder="Dartmouth Email" onChange={this.onEmailChange} value={this.state.email} />
        </div>
        <div className="inputline">
          Password: 
          <Input type="password" className="response" id="passwordInput" placeholder="Password" onChange={this.onPasswordChange} value={this.state.password} />
        </div>
        <div className="signup">
          New to DartCal?
          <NavLink to="/signup">
            <div classname='fakelink'> Sign Up </div>
          </NavLink>
        </div>
      </div>
        <div className="enterorcancelbuttons">
          <Button className="signupButton" id="createButton" onClick={this.handleSigninButtonClick}>Log In</Button> &nbsp;
          <Button className="cancelButton" id="cancelButton" onClick={this.handleCancelButtonClick}>Cancel</Button>
        </div>
    </div>
    );
  }
}

// export default NewPost;
export default withRouter((SignIn));