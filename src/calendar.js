/* eslint no-alert: 0 */
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Input } from 'reactstrap';
import firebase from 'firebase';
import logo from './calendar.png';
import { NavLink, withRouter } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import './calendar.css' 
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';

//import './calendar.css';

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
      <FullCalendar 
        dateClick={this.handleDateClick} 
        plugins={[ dayGridPlugin ]} 
        events={[
          { title: 'Lily is cooler than Scott', date: '2020-05-01' },
          { title: 'Scott can\'t change these events bc he doesnt know how it works', date: '2020-05-02' }
          ]}
      />
    )
  }
}

// export default NewPost;
export default withRouter((Calendar));

