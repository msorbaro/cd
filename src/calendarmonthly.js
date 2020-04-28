/* eslint no-alert: 0 */
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Input } from 'reactstrap';
import firebase from 'firebase';
import logo from './pictures/calendar.png';
import userpic from './pictures/user.png';
import search from './pictures/magnifying-glass.png'
import plus from './pictures/plus.png';
import { NavLink, withRouter } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import './calendar.css' 
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';


class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleCancelButtonClick = (event) => {
    this.props.history.push('/');
  }

  render() {
    return (
      <div className="allCal">
      <div className="calSearchBar">
        <img width="30px" src={search}/>
        <input type="text" width="10px" ></input>
      </div>
      <div className="cal">
      <FullCalendar 
        dateClick={this.handleDateClick} 
        plugins={[ dayGridPlugin ]} 
        events={[
          { title: 'Scott is cooler than Dylan', date: '2020-05-01' },
          {title: 'bc he doesnt know how it works', date: '2020-05-02'},
          { title: '*Kat can\'t change this', date: '2020-05-02' }
          ]}
      />
      </div>
      <div className="dartCalLogoCal">
        DartCal
        <div className="scheduleLogo"><img width="30px" src={logo}/></div>
      </div>
      <div className="sidebar">
         <div className="addNewEvent">
            <img width="20px" src={plus}/> 
            Add Event
         </div>
         <div className="toggleMonthWeek">
           Weekly View
         </div>
         <div className="toggleCalendarView">
           Calendar View Options
           <div className="checkbox"> 
            <input type="checkbox"></input> Classes
           </div>
           <div className="checkbox"> 
            <input type="checkbox"></input> Clubs
           </div>
           <div className="checkbox"> 
            <input type="checkbox"></input> Social Events
           </div>
           <div className="checkbox"> 
            <input type="checkbox"></input> Other
           </div>
        </div>
        <div className="friendsCal">
          <div>Friend's Calendars</div>
          <div className="checkbox"> 
            <img width="20px" src={plus}/> 
            Add Friend
          </div>
        </div>
         <div className="calProfileIcon">
            <img width="50px" src={userpic} /> 
            <NavLink to="/profile">Profile</NavLink>
         </div>
      </div>
      </div>
    )
  }
}

// export default NewPost;
export default withRouter((Calendar));

