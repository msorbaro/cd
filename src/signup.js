/* eslint no-alert: 0 */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Input } from 'reactstrap';
import firebase from 'firebase';
import './signup.css';
import logo from './calendar.png'
import create from './datastore';
// import * as db from './datastore';\

class SignUp extends Component {
  constructor(props) {

    super(props);

    this.state = {
      email: '',
      firstusername: '',
      lastusername: '',
      password: '',
      passwordTwo: '',
    };
  }

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  onPasswordChange= (event) => {
    this.setState({ password: event.target.value });
  }

  onPasswordTwoChange= (event) => {
    this.setState({ passwordTwo: event.target.value });
  }

  onFirstUsernameChange= (event) => {
    this.setState({ firstusername: event.target.value });
  }

  onLastUsernameChange= (event) => {
    this.setState({ lastusername: event.target.value });
  }


  handleSignupButtonClick = (event) => {
      return <create />
  }

  handleCancelButtonClick = (event) => {
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="all">
        <div className="dartCalLogoSmall">
          DartCal
          <div className="scheduleLogo"><img width="80px" src={logo}/></div>
        </div>
          <div className="accountinfo">
            <div className="inputline"> 
              Dartmouth Email: 
              <Input placeholder="Dartmouth Email" onChange={this.onEmailChange} value={this.state.email} />
            </div>
            <div className="inputline"> 
              First Name: 
              <Input placeholder="First name" onChange={this.onFirstUsernameChange} value={this.state.firstusername} />
            </div>
            <div className="inputline"> 
              Last Name: 
              <Input  placeholder="Last name" onChange={this.onLastUsernameChange} value={this.state.lastusername} />
            </div>
            <div className="inputline"> 
              Password:
              <Input type="password"  id="passwordInput" placeholder="Password" onChange={this.onPasswordChange} value={this.state.password} />
            </div>
            <div className="inputline"> 
              Confirm Password: 
              <Input type="password"  id="passwordInput" placeholder="Password" onChange={this.onPasswordTwoChange} value={this.state.passwordTwo} />
            </div>
          </div>
          <div className="enterorcancelbuttons">
            <Button  id="createButton" onClick={this.handleSignupButtonClick}>Create User</Button> &nbsp; 
            <Button  id="cancelButton" onClick={this.handleCancelButtonClick}>Cancel</Button>
          </div>
      </div>
    );
  }
}

// export default NewPost;
export default withRouter((SignUp));