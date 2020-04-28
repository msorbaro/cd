/* eslint no-alert: 0 */
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Input } from 'reactstrap';
import firebase from 'firebase';
import logo from './pictures/calendar.png';
import userpic from './pictures/user.png';
import plus from './pictures/plus.png';
import { NavLink, withRouter } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import './calendar.css' 
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';

//import './calendarmonthly.css';

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
      <div className="all">
      <div className="cal">
      <FullCalendar 
        dateClick={this.handleDateClick} 
        plugins={[ dayGridPlugin ]} 
        events={[
          { title: 'Lily is cooler than Scott', date: '2020-05-01' },
          {title: 'bc he doesnt know how it works', date: '2020-05-02'},
          { title: '*Scott can\'t change this', date: '2020-05-02' }
          ]}
      />
      </div>
      <div className="dartCalLogoCal">
        DartCal
        <div className="scheduleLogo"><img width="20px" src={logo}/></div>
      </div>
      <div className="sidebar">
         <div className="addNewEvent">
            <img width="20px" src={plus} />
            Add Event
         </div>
         <div className="toggleMonth/Week">
           
         </div>
         <div className="toggleCalendarView">

         </div>
         <div className="friendsCal">

         </div>
         <div className="calProfileIcon">
            <img width="60px" src={userpic} />
            Profile
         </div>
      </div>
      </div>
    )
  }
}

// export default NewPost;
export default withRouter((Calendar));

