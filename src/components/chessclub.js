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
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import search from '../pictures/magnifying-glass.png'

class ChessClub extends Component {
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
        clubEvents: [
          { title: 'Chess Weekly Match', start: '2020-05-13', className:'eTypeClub',id:'Chess Weekly Match2020-05-13'},
          {title: 'Chess Weekly Match', start: '2020-05-20', className:'eTypeClub',id:'Chess Weekly Match2020-05-20'},
          {title: 'Chess Weekly Match', start: '2020-05-27', className:'eTypeClub',id:'Chess Weekly Match2020-05-27'},
          { title: 'Chess Tournament', start: '2020-05-16', className:'eTypeClub',id:'Chess Weekly Match2020-05-16' },
          {title: 'Chess Regionals', start: '2020-05-23', className:'eTypeClub',id:'Chess Regionals2020-05-23'},
          {title: 'Chess Weekly Match', start: '2020-05-6', className:'eTypeClub',id:'Chess Weekly Match2020-05-6'},
          ]
      };  
    }

    componentDidMount() {
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

    subscribe = () => {
      alert("You have successfully subscribed!")
      for (let i = 0; i < Object.keys(this.state.clubEvents).length; i += 1) {
        const currentKey = Object.keys(this.state.clubEvents)[i];
        const currItem = this.state.clubEvents[currentKey];

        db.addCalEvent(
          this.state.userID,
          currItem.title+currItem.start,
          currItem,
        );
      }
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
          Dartmouth Chess Club
        </div>
        <div className="searchBar">
          <img width="40px" src={search} style={{ 'vertical-align':'middle' }}/>
          <input type="text" width="40px" placeholder="Search" className="shortSearch" ></input>
        </div>
        <div className="buttonContainer">
          <Button id="club" style={{'font-size': '35px', 'line-height': '50px'}} onClick={this.subscribe}>Subscribe</Button>
        </div>
        <img class="b" src="https://students.dartmouth.edu/coso/sites/students_coso.prod/files/styles/slide/public/council_student_organizations/images/chess_club_summer_.jpg?itok=dzBOaD9Z" width="35%" height="35%"/>
        <div className="clubCal"> 
        <FullCalendar 
          dateClick={this.handleDateClick} 
          plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]} 
          header={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
          }}
          selectable= {true}
          slotDuration= {'00:30:00'}
          eventClick = {this.handleEventClick}
          events= {this.state.clubEvents}
        />
        </div>
        <div className="description">
          <h2 class="clubHeader" style={{'top': '-7%'}}>Description</h2>
          <p class="clubInfo" style={{'font-size': '15px', 'top': '15%', 'left': '3%'}}>Dartmouth Chess Club is a quickly expanding group of chess players.

            We participate in tournaments, offer instruction to new players, and meet weekly.

            Come and enjoy everything from a long, serious game to chess variants like atomic chess and bughouse!</p>
          <h2 class="clubHeader" style={{'top': '60%'}}>Contact Info</h2>
          <p class="clubInfo" style={{'top': '78%', 'left': '20%', 'font-size':'20px'}}>dartmouth.chess.club@dartmouth.edu</p>
        </div>
      </div>
      );
    }
  }
  
  // export default NewPost;
  export default withRouter((ChessClub));