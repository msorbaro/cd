/* eslint no-alert: 0 */
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Input } from 'reactstrap';
import firebase from 'firebase';
import logo from './calendar.png';
import { NavLink, withRouter } from 'react-router-dom';
import * as db from './datastore';

//import './profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: '',
      userFirstName: '',
      userLastName: '',
      userYear: '',
      friendsList: '',
      bio: '',
      image:'',
      clubList: '',
      editing: false,
    };  
  }

  compoundDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ userID: user.uid });
        this.setState({ userFirstName: '' });
        this.setState({ userLastName: user.uid });
        this.setState({ userYear: user.uid });
        this.setState({ userID: user.uid });

      }
    });
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ userID: user.uid });
        this.setState({ username: user.displayName });
      }
    });
    db.getQuesions(this.recievedQuestions);
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
      <div className="all">
        <div className="dartCalLogoProfile">
          DartCal
          <div className="scheduleLogo"><img width="80px" src={logo}/></div>
        </div>
        <div className="profileinfo">
          <div className="inputline">
            Username: 
            <Input className="response" id="emailInputBar" placeholder="Dartmouth Email" onChange={this.onEmailChange} value={this.state.email} />
          </div>
          <div className="inputline">
            Password: 
            <Input type="password" className="response" id="passwordInput" placeholder="Password" onChange={this.onPasswordChange} value={this.state.password} />
          </div>
        </div>
      </div>
    );
  }
}

// export default NewPost;
export default withRouter((Profile));