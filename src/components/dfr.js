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

class Dfr extends Component {
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
                <Button id="club" style={{'font-size': '35px', 'line-height': '50px'}}>Subscribe</Button>
              </div>
              <img class="b" src="https://engineering.dartmouth.edu/assets/mag/2011/08/KML_2576_adj.jpg" width="35%" height="35%"/>
              <div className="clubCal"> 
              <FullCalendar dateClick={this.handleDateClick} plugins={[ dayGridPlugin ]} 
              events={[
                { title: 'Weekly Meeting', date: '2020-05-11' },
                {title: 'Weekly Meeting', date: '2020-05-18'},
                {title: 'Weekly Meeting', date: '2020-05-4'},
                {title: 'Weekly Meeting', date: '2020-05-25'},
                { title: 'DFR pong', date: '2020-05-15' },
                {title: 'DFR formal', date: '2020-05-22'},
                ]}
              />
              </div>
              <div className="description">
                <h2 class="clubHeader" style={{'top': '-7%'}}>Description</h2>
                <p class="clubInfo" style={{'font-size': '15px', 'top': '15%', 'left': '3%'}}>We are Dartmouth Formula Racing: designed, built, driven by students. We compete in the Formula Hybrid Competition and have done well recently. We have weekly meetings and are looking for anyone who is excited about software or mechanical engineering! It's always a great place for the boys and we would love to see some new faces.</p>
                <h2 class="clubHeader" style={{'top': '60%'}}>Contact Info</h2>
                <p class="clubInfo" style={{'top': '78%', 'left': '20%', 'font-size':'20px'}}>katherine.lasonde.23@dartmouth.edu</p>
              </div>
            </div>
            );
          }
        }
  
  // export default NewPost;
  export default withRouter((Dfr));