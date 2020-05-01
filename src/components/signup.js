/* eslint no-alert: 0 */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Input } from 'reactstrap';
import firebase from 'firebase';
import '../cssfolder/signup.css';
import logo from '../pictures/calendar.png'
import * as db from './datastore';

class SignUp extends Component {
  constructor(props) {

    super(props);

    this.state = {
      email: '',
      userID: '',
      firstusername: '',
      lastusername: '',
      password: '',
      passwordTwo: '',
      userYear: '',
      image: '',
    };
  }

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  }

  onImageChange = (event) => {
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

  onUserYearChange= (event) => {
    this.setState({ userYear: event.target.value });
  }


  handleSignupButtonClick = (event) => {
    if ((this.state.email.endsWith('@dartmouth.edu') || this.state.email.endsWith('@Dartmouth.edu')) && this.state.password === this.state.passwordTwo) {
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
        alert(error);
      });
    
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
        db.createUser(
          user.uid, this.state.email, this.state.firstusername,
          this.state.lastusername, this.state.userYear,)
       
        
    
          console.log('pushing history');
          this.props.history.push('/');
        }
      });
    } else if (!this.state.email.endsWith('@dartmouth.edu')) {
      alert('Please enter a dartmouth.edu email');
    } else {
      alert('Make sure passwords match');
    }
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
          <div className="signupnameContainer">
            <h6>Darmouth Email:</h6>
            <h6>First Name:</h6>
            <h6>Last Name:</h6>
            <h6>Password:</h6>
            <h6>Confirm Password:</h6>
            <h6>Class Year:</h6>
          </div>
          <div className="signupinputContainer">
            <div className="indivInput">
              <h6><Input placeholder="Dartmouth Email" onChange={this.onEmailChange} value={this.state.email} /></h6>
            </div>
            <div className="indivInput">
              <h6><Input placeholder="First name" onChange={this.onFirstUsernameChange} value={this.state.firstusername} /></h6>
            </div>
            <div className="indivInput">
              <h6><Input  placeholder="Last name" onChange={this.onLastUsernameChange} value={this.state.lastusername} /></h6>
            </div>
            <div className="indivInput">
              <h6><Input type="password"  id="passwordInput" placeholder="Password" onChange={this.onPasswordChange} value={this.state.password} /></h6>
            </div>
            <div className="indivInput">
              <h6><Input type="password"  id="passwordInput" placeholder="Password" onChange={this.onPasswordTwoChange} value={this.state.passwordTwo} /></h6>
            </div>
            <div className="indivInput">
              <h6><Input type="classYear"  id="classYear" placeholder="Class Year ex. 2023" onChange={this.onUserYearChange} value={this.state.userYear}/></h6>
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