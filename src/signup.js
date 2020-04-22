/* eslint no-alert: 0 */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Input } from 'reactstrap';
import firebase from 'firebase';

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
    if ((this.state.email.endsWith('@dartmouth.edu') || this.state.email.endsWith('@Dartmouth.edu')) && this.state.password === this.state.passwordTwo) {
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
        alert(error);
      });

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          firebase.database().ref(`users/${user.uid}`).set({
            email: this.state.email,
            username: `${this.state.firstusername} ${this.state.lastusername}`,
          });
          user.updateProfile({
            displayName: `${this.state.firstusername} ${this.state.lastusername}`,
          });
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
      <div >
        <div >
          <div >
            <div> Enter your Dartmouth email: </div>
            <Input placeholder="Dartmouth Email" onChange={this.onEmailChange} value={this.state.email} />
            <div > Enter your first name: </div>
            <Input placeholder="First name" onChange={this.onFirstUsernameChange} value={this.state.firstusername} />
            <div > Enter your last name: </div>
            <Input  placeholder="Last name" onChange={this.onLastUsernameChange} value={this.state.lastusername} />
            <div > Enter a password: </div>
            <Input type="password"  id="passwordInput" placeholder="Password" onChange={this.onPasswordChange} value={this.state.password} />
            <div className="prompt"> Confirm password: </div>
            <Input type="password"  id="passwordInput" placeholder="Password" onChange={this.onPasswordTwoChange} value={this.state.passwordTwo} />

          </div>
          <div>
            <Button  id="createButton" onClick={this.handleSignupButtonClick}>Sign Up</Button>
            <Button  id="cancelButton" onClick={this.handleCancelButtonClick}>Cancel</Button>
          </div>
        </div>
      </div>
    );
  }
}

// export default NewPost;
export default withRouter((SignUp));