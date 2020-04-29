import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Input } from 'reactstrap';
import firebase from 'firebase';
import logo from '../pictures/calendar.png';
import { NavLink, withRouter } from 'react-router-dom';
import * as db from './datastore';
import '../cssfolder/profile.css';
import getUser from './datastore';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

class ClubProfile extends Component {
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
        db.getCurrUser(this.setCurrUser);
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
        <div> club profile page 
        <FullCalendar dateClick={this.handleDateClick} plugins={[ dayGridPlugin ]} 
        events={[
          { title: 'DFR', date: '2020-05-01' },
          {title: 'rad', date: '2020-05-02'},
          { title: 'is', date: '2020-05-02' }
          ]}
      />
      </div>
      );
    }
  }
  
  // export default NewPost;
  export default withRouter((ClubProfile));