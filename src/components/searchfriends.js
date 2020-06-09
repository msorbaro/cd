/* eslint no-alert: 0 */
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Input } from 'reactstrap';
import firebase from 'firebase';
import logo from '../pictures/calendar.png';
import { NavLink, withRouter } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import '../cssfolder/calendar.css' // webpack must be configured to do this
import '../cssfolder/searchfriends.css'
import ReactSearchBox from 'react-search-box';
import * as db from './datastore';
import userpic from '../pictures/user.png';



class SearchFriends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allUsers: [],
      friendsIDs: ["6YwmMK3Z5OSe9hD8iYLOl2owJar1", "qJ79iMTzwzSEJvSvlJq5p6sbIvl1", "yvKgKo5tmNXtKbIVtL6k6bYcQ6X2", "jlrykrdLwiZ5igAOifGPfEVLoiP2", "r48jVmIbLGas73K1f28Jh9eiUku2"],
    };
  }

  componentDidMount() {
    db.getListOfUsers(this.setSearchBarUsers)
  }

  goToFriendName = (firstAndLastName) => {
    var nameArray = firstAndLastName.split(" ");
    var firstName = nameArray[0];
    var lastName = nameArray[1];

    //console.log("index" + index);
    db.getUserID(firstName, lastName, this.goToFriendID)
     
  }

  goToFriendID = (ID) => {
    this.props.history.push({
      pathname: '/friendprofile',
      state: {friendID: ID}

  })  
  }

  goToFriend = (index) => {
    this.props.history.push({
      pathname: '/friendprofile',
      state: {friendID: this.state.friendsIDs[index]}

  })  
  }

  setAllUsers = (array) => {
    this.state.allUsers = array;
  }
  

  setSearchBarUsers = (userList) => {
    var uL = []
      for (let i = 0; i < Object.keys(userList).length; i += 1) {
        const currentKey = Object.keys(userList)[i];
        const currItem = userList[currentKey]; // the user
        
        var firstName = currItem.userFirstName; // typeof is a string
        var lastName = currItem.userLastName; // typeof is a string
        var fullName = firstName + " " + lastName;
        var firstLetter = currItem.userFirstName.substr(0);

        var object = {
          key: firstLetter,
          value: fullName,
        }
        
        uL.push(object); 
        console.log("here");
        console.log(uL);
        this.state.allUsers.push(object);
        console.log("everywhere");
        //console.log(allUsers);
      }
      
      // remove this eventually when we stop hard coding the clubs
      var dfr = {
        key: 'd',
        value: 'Dartmouth Formula Racing',
      }
      uL.push(dfr); 

      var dchess = {
        key: 'd',
        value: 'Dartmouth Chess Club',
      }
      uL.push(dchess); 


      var dtrade = {
        key: 'd',
        value: 'DTrade',
      }
      uL.push(dtrade); 

      var lax = {
        key: 'c',
        value: 'Club Lacrosse',
      }
      uL.push(lax); 

      console.log("uL");
      console.log(uL);
        // this.setState ({
        //   // TO DO ITS NOT UPDATING
        //   allUsers: uL,
        // })

        // update the allUsers array list

        //this.setAllUsers(uL);

        for (let i = 0; i < Object.keys(uL).length; i += 1) {
          const currentKey = Object.keys(uL)[i];
          const currItem = userList[currentKey]; // the user
        }
        console.log("there")
        console.log(this.allUsers);
      
  }

  handleCancelButtonClick = (event) => {
    this.props.history.push('/');
  }

  

  render() {

    return (
      <div className="all">
          <NavLink to="/calendar" class="logo">
            <div className="dartCalLogoSearch">
              DartCal
              <div className="scheduleLogo"> 
                <img width="80px" src={logo}/>
              </div>
            </div>
          </NavLink>
          <div className="toProfile">
          <NavLink to="/profile"> 
            <img width="60px" src={userpic} style={{ 'vertical-align':'middle', 'mix-blend-mode': 'soft-light'}}/> 
            <div style={{ 'margin-top':'8px'}}>Profile</div>
          </NavLink> &nbsp;
          </div>
          <div className="toCal">
            <NavLink to="/calendar">
              <img width="60px" src={logo} style={{ 'vertical-align':'middle', 'mix-blend-mode': 'soft-light'}}/>
              <div style={{ 'margin-top':'8px'}}>Calendar</div>
            </NavLink>
          
          </div>
         
          <div className="searchBarFriend">
            <p></p>
            <ReactSearchBox
            placeholder="Search Here!!"
            value=""
            data={this.state.allUsers}
            callback={record => console.log("hello" + record)}
            //onClick={() => this.goToFriend()}
            onSelect={record => this.goToFriendName((record["value"]))}
          />  
          </div>

        <div className="clubHeader">Clubs:</div>
        <div className="clubSection">
          <div class="clubBrowse">
            <div class="clubContainer">
              <div>
                <NavLink to="/dfr">
                  <img class="a" src="https://engineering.dartmouth.edu/assets/mag/2011/08/KML_2576_adj.jpg" width="65%" height="65%"/>
                  <p>Dartmouth Formula Racing</p>
                </NavLink>
              </div>
            </div>
            <div class="clubContainer">
              <div>
                <NavLink to="/chessclub">
                  <img class="a" src="https://live.staticflickr.com/7271/7088587775_35b4b1efc1_b.jpg" width="65%" height="65%"/>
                  <p>Dartmouth Chess Club</p>
                </NavLink>
              </div>
            </div>
            <div class="clubContainer">
              <div>
                <NavLink to="/dtrade">
                  <img class="a" src="https://i.ytimg.com/vi/if-2M3K1tqk/maxresdefault.jpg" width="65%" height="65%"/>
                  <p>Dartmouth D-Trade</p>
                </NavLink>
              </div>
            </div> 
            <div class="clubContainer">
              <div>
                <NavLink to="clublax">
                  <img class="a" src="https://admissions.dartmouth.edu/sites/admissions.prod/files/styles/wysiwyg_width_only_590/public/admissions/wysiwyg/img_1597.jpg?itok=ZJSFJ94r" width="65%" height="65%"/>
                  <p>Women's Club Lax</p>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <div className="club-triangle-left"></div>
        <div className="club-triangle-right"></div>
        <div className="friendHeader">Friends:</div>
        <div className="friendSection">
          <div class="friendBrowse">
            <div class="friendContainer">
              <div>
              <a href="friendprofile">
                <img class="a" onClick={() => this.goToFriend(0)} src="https://cs.dartmouth.edu/~albertoq/cs10/people/scott-gibbons.jpg" width="65%" height="65%"/>
                <p  onClick={() => this.goToFriend(0)}>{"Scott Gibbons"}</p>
                </a>
              </div>
            </div>
            <div class="friendContainer">
              <div>
                <a href="">
                <img class="a" onClick={() => this.goToFriend(1)} src="https://cs.dartmouth.edu/~albertoq/cs10/people/morgan-sorbaro.jpg" width="65%" height="65%"/>
                <p  onClick={() => this.goToFriend(1)}>{"Morgan Sorbaro"}</p>
                </a>
              </div>
            </div>
            <div class="friendContainer">
              <div>
              <a href="friendprofile">
                <img class="a" onClick={() => this.goToFriend(2)} src="https://cs.dartmouth.edu/~albertoq/cs10/people/lily-maechling.jpg" width="65%" height="65%"/>
                <p  onClick={() => this.goToFriend(2)}>{"Lily Maechling"}</p>
                </a>
              </div>
            </div> 
            <div class="friendContainer">
              <div>
              <a href="friendprofile">
                <img class="a" onClick={() => this.goToFriend(3)} src="https://cs.dartmouth.edu/~albertoq/cs10/people/dylan-bienstock.jpg" width="65%" height="65%"/>
                <p  onClick={() => this.goToFriend(3)}>{"Dylan Bienstock"}</p>
              </a>
              </div>
            </div>
            <div class="friendContainer">
              <div>
              <a href="friendprofile">
                <img class="a"onClick={() => this.goToFriend(4)} src="https://images.squarespace-cdn.com/content/v1/551cbdc5e4b0cd11d2597487/1512060367564-IGT0WBWUIVLHVF09B841/ke17ZwdGBToddI8pDm48kEcIqZ-D2i5g-z-Jm45MtO97gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmnhdptcuU1alwky_sWs380ox8UhC6Zi9T53n4b7PpzvcsD7S2cubC6vFsaWXK1aWB/nnY62nCr.jpg?format=1000w" width="65%" height="65%"/>
                <p  onClick={() => this.goToFriend(4)}>{"Annika Kouhia"}</p>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="friend-triangle-left"></div>
        <div className="friend-triangle-right"></div>
      </div>
    )
  }
}

// export default NewPost;
export default withRouter((SearchFriends));

