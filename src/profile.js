/* eslint no-alert: 0 */
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Input } from 'reactstrap';
import firebase from 'firebase';
import logo from './pictures/calendar.png';
import { NavLink, withRouter } from 'react-router-dom';
import * as db from './datastore';
import './profile.css';
import getUser from './datastore';


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
      getUser(this.setCurrUser);
  }

  setCurrUser = (currUser) => {
     this.setState({
        userID: currUser.userID,
        userFirstName: currUser.userFirstName,
        userLastName: currUser.userLastName,
        userYear: currUser.userYear,
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
      <div className="all">
        <div className="dartCalLogoProfile">
          DartCal
          <div className="scheduleLogo"><img width="80px" src={logo}/></div>
        </div>
        <div className="profileinfo">
          <div>
            <h3 className="sectionHeader">Profile</h3>
            <div className="imgStyle">
              <img src="https://cs.dartmouth.edu/~albertoq/cs10/people/kat-lasonde.png" width="150" height="150"/>
            </div>
          </div>
          <div className="nameContainer">
            <h6>Name</h6>
            <h6>Email</h6>
            <h6>Password</h6>
            <h6>Year</h6>
          </div>
          <div className="inputContainer">
            <div className="indivInput">
              <h6>{this.userFirstName}</h6>
              <h6>hi</h6>
            </div>
            <div className="indivInput">
              <h6>kat.lasonde.23@dartmouth.edu</h6>
            </div>
            <div className="indivInput">
              <h6>***********</h6>
            </div>
            <div className="indivInput">
              <h6>2023</h6>
            </div>
          </div>
        </div>

        <div className="classinfo">
          <div>
            <h3 className="sectionHeader">Classes</h3>
          </div>
          <div className="listStyle">
            <ul>
              <li>COSC10</li>
              <li>BIOL13</li>
            </ul>
          </div>
        </div>
        
      </div>
    );
  }
}

// export default NewPost;
export default withRouter((Profile));