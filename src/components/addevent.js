import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Input } from 'reactstrap';
import '../cssfolder/calendar.css' 


export default class AddEvent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { show: false, eventTitle:"", eventDateStart:"", eventTimeStart:"", eventDateEnd:"", eventTimeEnd:"", eventType:"" };
      }
      showModal = () => {
        this.setState({ show: true });
      };
    
      hideModal = () => {
        this.setState({ show: false });
      };
    
        submit = () => {
        var Event = {
          title: this.state.eventTitle,
          start: this.state.eventDateStart.concat( "T", this.state.eventTimeStart),
          end: this.state.eventDateStart.concat("T", this.state.eventTimeStart),
          className: this.state.eventType,
        }
        this.props.save(this.props.id, Event)
        this.hideModal();
      }
    
      changeNewTitle = (event) => {
        this.setState({newTitle: event.target.value})
      }
    
  render() {
    if (this.state.show){
        return (
        <div className="modal">
        <div className="modalTitle"><br></br>Add New Event</div>
            <div className="newEventInfo">
                <div className="inputline"> 
                Name: &nbsp;
                <Input type="text" placeholder="Event Name" value={this.state.eventTitle} onChange={this.changeNewTitle()}/>
                </div>
                <div className="inputline"> 
                <Input  type="radio" name="eventType" value="classes"/>Classes &nbsp;
                <Input  type="radio" name="eventType"  value="clubs"/>Clubs &nbsp;
                <Input  type="radio" name="eventType" value="social"/>Social &nbsp;
                <Input  type="radio" name="eventType"  value="other"/>Other &nbsp;
                </div>
                <div className="inputline" > 
                Start Date: &nbsp;
                <Input type="date" id="short" value={this.state.eventDateStart}/>
                Start Time: &nbsp;
                <Input type="time" id="short" value={this.state.eventTimeStart}/>
                </div>
                <div className="inputline"> 
                End Date: &nbsp;
                <Input type="date" id="short" value={this.state.eventDateEnd}/>
                End Time: &nbsp;
                <Input type="time" id="short" value={this.state.eventTimeEnd}/>
                </div>
            </div>
            <div className="enterorcancelbuttons" id="longButtons">
            <Button onClick={this.submit}> Save </Button> &nbsp;
            <Button onClick={this.hideModal}> Close </Button>
            </div>
        </div>
        );
    }
     return(null)
}
};