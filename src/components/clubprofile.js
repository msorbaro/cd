import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Input } from 'reactstrap';
import firebase from 'firebase';
import logo from '../pictures/calendar.png';
import { NavLink, withRouter } from 'react-router-dom';
import * as db from './datastore';
import '../cssfolder/clubprofile.css';
import getUser from './datastore';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import search from '../pictures/magnifying-glass.png'

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
      <div className="clubPageAll">  
        <div className="clubName">
          Dartmouth Formula Racing
        </div>
        <div className="searchBar">
          <img width="40px" src={search} style={{ 'vertical-align':'middle' }}/>
          <input type="text" width="40px" placeholder="Search" className="shortSearch" ></input>
        </div>
        <div className="buttonContainer">
          <Button style={{'border-radius': '100px'}}class="club">Subscribe</Button>
        </div>
        <img class="a" src="https://engineering.dartmouth.edu/assets/mag/2011/08/KML_2576_adj.jpg" width="35%" height="35%"/>
        <div className="clubCal"> 
        <FullCalendar dateClick={this.handleDateClick} plugins={[ dayGridPlugin ]} 
        events={[
          { title: 'DFR', date: '2020-05-01' },
          {title: 'rad', date: '2020-05-02'},
          { title: 'is', date: '2020-05-02' }
          ]}
        />
        </div>
      </div>
      );
    }
  }
  
  // export default NewPost;
  export default withRouter((ClubProfile));