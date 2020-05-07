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

class ClubLax extends Component {
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
          Women's Club Lax
        </div>
        <div className="searchBar">
          <img width="40px" src={search} style={{ 'vertical-align':'middle' }}/>
          <input type="text" width="40px" placeholder="Search" className="shortSearch" ></input>
        </div>
        <div className="buttonContainer">
          <Button id="club" style={{'font-size': '35px', 'line-height': '50px'}}>Subscribe</Button>
        </div>
        <img class="b" src="https://admissions.dartmouth.edu/sites/admissions.prod/files/styles/wysiwyg_width_only_590/public/admissions/wysiwyg/img_1597.jpg?itok=ZJSFJ94r" width="28%" height="35%"/>
        <div className="clubCal"> 
        <FullCalendar dateClick={this.handleDateClick} plugins={[ dayGridPlugin ]} 
        events={[
          { title: 'Practice', date: '2020-05-14' },
          { title: 'Practice', date: '2020-05-12' },
          { title: 'Practice', date: '2020-05-19' },
          {title: 'Practice', date: '2020-05-21'},
          { title: 'Practice', date: '2020-05-26' },
          {title: 'Practice', date: '2020-05-28'},
          { title: 'Tournament', date: '2020-05-30' },
          ]}
        />
        </div>
        <div className="description">
          <h2 class="clubHeader" style={{'top': '-7%'}}>Description</h2>
          <p class="clubInfo" style={{'font-size': '15px', 'top': '15%', 'left': '3%'}}>In order to play sports here at Dartmouth, you don’t need to be a Division 1 athlete. You also don’t need to commit hours and hours of time to practice and lift if you don’t want to, but you can still get all the advantages of having a team and getting to be athletic on a "chill" level. Club sports are a fun, casual outlet for playing all of your favorite sports. Club Lax is a great way to meet other girls and show off your skills from highschool!</p>
          <h2 class="clubHeader" style={{'top': '60%'}}>Contact Info</h2>
          <p class="clubInfo" style={{'top': '78%', 'left': '20%', 'font-size':'20px'}}>d.trade@dartmouth.edu</p>
        </div>
      </div>
      );
    }
  }
  
  // export default NewPost;
  export default withRouter((ClubLax));