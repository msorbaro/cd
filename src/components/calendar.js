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
import dayGridPlugin from '@fullcalendar/daygrid'
import * as db from './datastore';


class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      isOpen: false, 
      eventTitle:"", 
      eventDateStart:"", 
      eventDateEnd:"", 
      eventType:"",
      eventTimeStart: "",
      eventTimeEnd: "",
      showClasses: true,
      showClubs: true,
      showSocial: true,
      showOther: true,
      userID: '',
      userEmail: '',
      userFirstName: '',
      userLastName: '',
      userYear: '',
      image: '',
      calID: 0,
      calendarEvents: [{event:"Dartmouth founding", start:"1769-12-13"}]
    };
  }

  calendarRef = React.createRef()

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  handleCancelButtonClick = (event) => {
    this.props.history.push('/');
  }

  handleEventClick = (calEvent) => {
    var event = calEvent.event
    console.log(event)
    db.deleteCalEvent(this.state.userID, event.id)

  }

  handleDateClick = (arg) => { 
    var name = prompt('Enter event name');
    var event = {
      title: name,
      start: arg.dateStr,
      id: this.state.calID,
    }

    db.addCalEvent(this.state.userID, this.state.calID, event)
    
    this.setState({
      calID: this.state.calID+1
    });

    db.getCalEvents(this.state.userID, this.getEvents);
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

  handleCheckboxChangeClasses = (event) =>
    this.setState({ showClasses: event.target.showClasses })

  handleCheckboxChangeClubs = (event) =>
    this.setState({ showClubs: event.target.showClubs })  

  handleCheckboxChangeSocial = (event) =>
    this.setState({ showSocial: event.target.showSocial })  

  handleCheckboxChangeOther = (event) =>
    this.setState({ showOther: event.target.showOther })

  getEvents = (allEvents) => {
    this.setState({ calendarEvents: allEvents })
  }

  setCurrUser = (currUser) => {
    this.setState({
       userID: currUser.userID,
       userEmail: currUser.userEmail,
       userFirstName: currUser.userFirstName,
       userLastName: currUser.userLastName,
       userYear: currUser.userYear,
       image: currUser.userPic,
     });

     db.getCalEvents(this.state.userID, this.setCalInfo);
  }

  setCalInfo = (calendarEvents) => {
  
    for (let i = 0; i < Object.keys(calendarEvents).length; i += 1) {
      const currentKey = Object.keys(calendarEvents)[i];
      const currItem = calendarEvents[currentKey];

      this.state.calendarEvents.push(currItem);
    }
  }

  componentDidMount() {
    db.getUserAndCal(this.callback)
  }

  callback = (events, currUser) => {
    if(events != null) {

      var array = []
      for (let i = 0; i < Object.keys(this.state.calendarEvents).length; i += 1) {
        const currentKey = Object.keys(this.state.calendarEvents)[i];
        const currItem = this.state.calendarEvents[currentKey];

        array.push(currItem);
      }
      this.setState({calendarEvents: array})
    }
    if(currUser != null){
      this.setState({
        userID: currUser.userID,
        userEmail: currUser.userEmail,
        userFirstName: currUser.userFirstName,
        userLastName: currUser.userLastName,
        userYear: currUser.userYear,
        image: currUser.userPic,
      });
    }
  }
  
  
  

  saveInfo = () => {

    var event =  {
      title: this.state.eventTitle,
      start: this.state.eventDateStart +":00",
      end: this.state.eventDateEnd +":00",
      className: 'eType' + this.state.eventType,
    }
    
    db.addCalEvent(
      this.state.userID, 
      this.state.calID, 
      {
        title: this.state.eventTitle,
        start: this.state.eventDateStart +":00",
        end: this.state.eventDateEnd +":00",
        className: 'eType' + this.state.eventType,
        id: this.state.calID,
      }
    )
    
    
  this.state.calendarEvents.push(event);

    //reset values
    this.setState({
        eventTitle: '',
        eventDateStart:'',
        eventDateEnd: '',
        eventType:'',
        isOpen: false,
        calID: this.state.calID+1
    });
    db.getCalEvents(this.state.userID, this.setCalInfo);

  }


  render() {
    console.log(this.state.calendarEvents);
    var cal =  <FullCalendar 
    dateClick={this.handleDateClick} 
    plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]} 
    header={{
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
    }}
    selectable= {true}
    slotDuration= {'00:30:00'}
    />;
    if(this.state.calendarEvents != null && this.state.calendarEvents.length != 0){
     cal = 
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
    
      // eventRender = {({ event, el }) => {
      //   const duration = moment.duration(moment(event.end).diff(event.start))
      //   const hours = duration.asHours()
      
      //   el.style.border = `1px solid ${event.backgroundColor}`
      //   el.className = `${el.className} event-class` // allows showing the edit and remove buttons only when hovering over the event
      
      //   if (!event.extendedProps.published && !event.allDay) {
      //       el.className = el.className + ' unpublished'  //it grays out the event if it hasn't been published
      //   }
      
      //   const child = document.createElement('div')
      //   child.innerHTML = `
      //       <div>
      //         <div  style="${styles.title}" class="pt-4">
      //           <strong>${hours} hrs </strong>      
      //         </div>
      
      //         <div class="event-actions">
      //           <button style="${styles.editStyle}" data-event-id=${event.id}> 
      //             <i class='fa fa-edit'></i>
      //           </button>
      //           <button style="${styles.removeStyle}" data-event-id=${event.id}> 
      //             <i class='fa fa-trash-o'></i> 
      //           </button>
      //         </div>
      //     </div>`
      
      //   el.appendChild(child)
      //   const btns = el.getElementsByTagName('button')
      //   const self = this
      //   btns[0].addEventListener('click', e => {
      //     self.onEditEvent(e)
      //   })
      //   btns[1].addEventListener('click', e => {
      //     self.onRemoveEvent(e)
      //  })
      // }}
      events= {this.state.calendarEvents}
    />
    }
    return (
      <div className="allCal">
      <div className="calSearchBar">
        <img width="30px" src={search} style={{ 'vertical-align':'middle' }}/>
        <input type="text" width="10px" placeholder="Search" className="shortSearch" ></input>
      </div>
      <div className="cal">
        {cal}
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
         <div className="toggleCalendarView">
           Calendar View Options
           <div className="checkbox"> 
            <input type="checkbox" checked={this.state.showClasses} onChange={this.handleCheckboxChangeClasses}></input> Classes
           </div>
           <div className="checkbox"> 
            <input type="checkbox" checked={this.state.showClubs} onChange={this.handleCheckboxChangeClubs}></input> Clubs
           </div>
           <div className="checkbox"> 
            <input type="checkbox" checked={this.state.showSocial} onChange={this.handleCheckboxChangeSocial}></input> Social Events
           </div>
           <div className="checkbox"> 
            <input type="checkbox" checked={this.state.showOther} onChange={this.handleCheckboxChangeOther}></input> Other
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

const container = document.createElement('div');
document.body.appendChild(container);
NavLink.render(<Calendar />, container);


// export default NewPost;
export default withRouter((Calendar));

