/* eslint no-alert: 0 */
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Modal from './modal';
import { Input } from 'reactstrap';
//import firebase from 'firebase';
import logo from '../pictures/calendar.png';
import userpic from '../pictures/user.png';
import search from '../pictures/magnifying-glass.png'
import plus from '../pictures/plus.png';
import { NavLink, withRouter } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react'
import '../cssfolder/calendar.css' 
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import * as db from './datastore';


class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false, eventTitle:"", eventDateStart:"", eventDateEnd:"", eventType:"" };
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  handleCancelButtonClick = (event) => {
    this.props.history.push('/');
  }

  handleDateClick = (event) => { 
    alert('a day has been clicked!');
  }

  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  createEventTitle = (event) => {
    this.setState({eventTitle: event.target.value});
  }

  createEventType = (event) => {
    this.setState({eventType: event.target.value});
  }

  createDateStart = (event) => {
    this.setState({eventDateStart: event.target.value});
  }

  createDateEnd = (event) => {
    this.setState({eventDateEnd: event.target.value});
  }



  saveInfo = () => {
    var eType = new String('eType' + this.state.eventType)
    if (!isNaN(this.state.eventDateStart.valueOf()) && !isNaN(this.state.eventDateEnd.valueOf())) { // valid dates
      FullCalendar.addEvent({
        title: this.state.eventTitle,
        start: this.state.eventDateStart,
        end: this.state.eventDateEnd,
        className: eType
      });
    
    // db.addCalEvent(this.state.eventTitle, this.state.eventType, this.state.eventDateStart, this.eventDateEnd)
    // this.setState({
    //     eventTitle: "",
    //     eventType: "",
    //     eventDateStart: "",
    //     eventDateEnd: ""
    // })
    // db.getCalEvents("this is a getter for all cal events? please fix ");
}}



  render() {
    return (
      <div className="allCal">
      <div className="calSearchBar">
        <img width="30px" src={search} style={{ 'vertical-align':'middle' }}/>
        <input type="text" width="10px" placeholder="Search" className="shortSearch" ></input>
      </div>
      <div className="cal">
      <FullCalendar 
        dateClick={this.handleDateClick} 
        plugins={[ timeGridPlugin, interactionPlugin ]} 
        selectable= {true}
        slotDuration= {'00:30:00'}
        events={[
          { title: 'lily', date: '2020-05-01', className:'eTypeClass'},
          {title: 'is better', date: '2020-05-02', className:'eTypeClub'},
          { title: 'than Scott', date: '2020-05-02', className:'eTypeSocial'},
          { title: 'yay', date: '2020-05-02', className:'eTypeOther'},
          {
            title: 'DFR',
            start: '2020-04-30',
            end: '2020-05-01',
            className:'eTypeClub'
          },
          {
            title: 'Pong',
            start: '2020-05-02T20:30:00',
            end: '2020-05-02T23:30:00',
            className:'eTypeSocial'
          },
          {
            title: 'Foco',
            start: '2020-04-30T12:00:00',
            className:'eTypeSocial'
          }
          ]}
      />
      </div>
      <div className="dartCalLogoCal">
        DartCal
        <div className="scheduleLogo"><img width="30px" src={logo} /></div>
      </div>
      <div className="addEventModal">
        <Modal show={this.state.isOpen} save={this.saveInfo} onClose={this.toggleModal}>
        <div className="newEventInfo">
                <div className="inputline"> 
                  Name: &nbsp;
                  <Input type="text" placeholder="Event Name" value={this.state.eventTitle} onChange={this.createEventTitle}/>
                </div>
                <div className="inputline"> 
                  <Input  type="radio" name="eventType" value="Class" onChange={this.createEventType}/>Classes &nbsp;
                  <Input  type="radio" name="eventType"  value="Club" onChange={this.createEventType}/>Clubs &nbsp;
                  <Input  type="radio" name="eventType" value="Social" onChange={this.createEventType}/>Social &nbsp;
                  <Input  type="radio" name="eventType"  value="Other" onChange={this.createEventType}/>Other &nbsp;
                </div>
                <div className="inputlinecal" > 
                  Start Date and Time: 
                  <Input type="datetime-local"value={this.state.eventDateStart} onChange={this.createDateStart}/>
                </div>
                <div className="inputlinecal"> 
                  End Date and Time: 
                  <Input type="datetime-local"  value={this.state.eventDateEnd} onChange={this.createDateEnd}/>
                </div>
            </div>  
        </Modal>
      </div>
      <div className="sidebar">
         <div className="addNewEvent">
            <img width="20px" src={plus}/> 
            <Button onClick={this.toggleModal}>Add Event</Button>
         </div>
         <div className="toggleMonthWeek">
          <NavLink to="/calendarmonthly">Monthly View</NavLink>
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

    const oldModal = ({ handleClose, show }) => {
      if (show){
        return (
          <div className="modal">
                <div className="modalTitle"><br></br>Add New Event</div>
            <div className="newEventInfo">
                <div className="inputline"> 
                  Name: &nbsp;
                  <Input type="text" placeholder="Event Name" value={Calendar.state.eventTitle} onChange={Calendar.changeNewTitle()}/>
                </div>
                <div className="inputline"> 
                  <Input  type="radio" name="eventType" value="classes"/>Classes &nbsp;
                  <Input  type="radio" name="eventType"  value="clubs"/>Clubs &nbsp;
                  <Input  type="radio" name="eventType" value="social"/>Social &nbsp;
                  <Input  type="radio" name="eventType"  value="other"/>Other &nbsp;
                </div>
                <div className="inputline" > 
                  Start Date: &nbsp;
                  <Input type="date" id="short" value={Calendar.state.eventDateStart}/>
                  Start Time: &nbsp;
                  <Input type="time" id="short" value={Calendar.state.eventTimeStart}/>
                </div>
                <div className="inputline"> 
                  End Date: &nbsp;
                  <Input type="date" id="short" value={Calendar.state.eventDateEnd}/>
                <div className="inputline"> 
                  End Time: &nbsp;
                  <Input type="time" id="short" value={Calendar.state.eventTimeEnd}/>
                </div>
                </div>
            </div>
            <div className="enterorcancelbuttons" id="longButtons">
              <Button onClick={Calendar.submit}> Save </Button> &nbsp;
              <Button onClick={handleClose}> Close </Button>
            </div>
        </div>
        );
      }
        return (null)
    };



const container = document.createElement('div');
document.body.appendChild(container);
NavLink.render(<Calendar />, container);


// export default NewPost;
export default withRouter((Calendar));

