/* eslint no-alert: 0 */
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Input } from 'reactstrap';
import firebase from 'firebase';
import logo from './calendar.png';
import { NavLink, withRouter } from 'react-router-dom';

//import './profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: '',
      name: '',
      friendslist: '',
    };  
  }

  getCurrentUser() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ userID: user.uid });
      }
    });
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

  handleCancelButtonClick = (event) => {
    this.props.history.push('/');
  }

  render() {
    return (
    <div >
      <p>Change your first name: </p> 
      <p>Change your bio: </p> 
      <p>Change your first name: </p> 
      <p>Change your first name: </p> 
    </div>

    );
  }
}

// export default NewPost;
export default withRouter((Profile));