/* eslint no-alert: 0 */
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal'
import { Input } from 'reactstrap';
import firebase from 'firebase';
import logo from '../pictures/calendar.png';
import userpic from '../pictures/user.png';
import search from '../pictures/magnifying-glass.png'
import plus from '../pictures/plus.png';
import { NavLink, withRouter } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import '../cssfolder/calendar.css' 
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

  createModal = (props) => {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Event
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>header</h4>
          <p>
            here
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  
  AddEvent = (event)  => {
    const [modalShow, setModalShow] = React.useState(false);
  
    return (
      <div>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Launch vertically centered modal
        </Button>
  
        <this.createModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </div>
    );
  }

  render() {
    return (
      <div className="allCal">
      <div className="calSearchBar">
        <img width="30px" src={search} style={{ 'vertical-align':'middle' }}/>
        <input type="text" width="10px" className="shortSearch" ></input>
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
        <div className="scheduleLogo"><img width="30px" src={logo} /></div>
      </div>
      <div className="sidebar">
         <div className="addNewEvent">
            <img width="20px" src={plus}/> 
            <Button onClick={this.AddEvent()}>Add Event</Button>
         </div>
         <div className="toggleMonthWeek">
          <NavLink to="/calendarweekly">Weekly View</NavLink>
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
          <div style={{color: '#1D263B' }}> 
            <img width="20px" src={plus}/> 
            Add Friend
          </div>
        </div>
         <div className="calProfileIcon">
            <img width="50px" src={userpic} style={{ 'vertical-align':'middle', 'mix-blend-mode': 'soft-light'}}/> 
            <NavLink to="/profile">Profile</NavLink>
         </div>
      </div>
      </div>
    )
  }
}

// export default NewPost;
export default withRouter((Calendar));

