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

class DTrade extends Component {
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
          { title: 'Trader Meeting', start: '2020-05-14', className:"eTypeClub", id:'Trader Meeting2020-05-14' },
          {title: 'Trader Meeting', start: '2020-05-21', className:"eTypeClub", id:'Trader Meeting2020-05-21' },
          {title: 'Trader Meeting', start: '2020-05-28', className:"eTypeClub", id:'Trader Meeting2020-05-28' },
          {title: 'Hand Shaking Practice', start: '2020-05-17', className:"eTypeClub", id:'Hand Shaking Practice2020-05-17'  },
          ]
      };  
    }

    componentDidMount() {
        db.getCurrUser(this.setCurrUser);
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
          Dartmouth D-Trade
        </div>
        <NavLink to="/searchfriends">
          <div className="searchBar">
            <img width="40px" src={search} style={{ 'vertical-align':'middle', 'mix-blend-mode': 'soft-light'}}/>
            Back to search
          </div>
        </NavLink>
        <div className="buttonContainer">
          <Button id="club" style={{'font-size': '35px', 'line-height': '50px'}}onClick={this.subscribe}>Subscribe</Button>
        </div>
        <img class="b" src="https://i.ytimg.com/vi/if-2M3K1tqk/maxresdefault.jpg" width="35%" height="35%"/>
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
          <p class="clubInfo" style={{'font-size': '15px', 'top': '15%', 'left': '3%'}}>Come learn about Wall Street and what traders do each day. Connect with other students who like trading that is similar to the trading that institutional investors do on a daily basis. At our meetings, we trade equities on the trading floor and look to jazz it up with some derivatives. D-Trade is Dartmouth's only fully closed trading platform in which students can learn how to trade like a Wall Street trader or institutional investor.


            Famous alumni have worked at/will work at: Credit Suisse, Societe Generale, Morgan Stanley and Goldman Sachs</p>
          <h2 class="clubHeader" style={{'top': '60%'}}>Contact Info</h2>
          <p class="clubInfo" style={{'top': '78%', 'left': '20%', 'font-size':'20px'}}>d.trade@dartmouth.edu</p>
        </div>
      </div>
      );
    }
  }
  
  // export default NewPost;
  export default withRouter((DTrade));