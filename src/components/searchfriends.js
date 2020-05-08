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

class SearchFriends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allUsers: [],
    };
  }

  handleCancelButtonClick = (event) => {
    this.props.history.push('/');
  }


  searchUserList = (userList) => {

    var userList = []
      for (let i = 0; i < Object.keys(userList).length; i += 1) {
        const currentKey = Object.keys(userList)[i]; // a user
        const currItem = userList[currentKey];
  
        userList.push(currItem);

        this.setState ({
          allUsers: userList,
        })
      }
  }
  


  data = [
    {
      key: 'a',
      value: 'Annika Kouhia',
  },
  {
    key: 'd',
    value: 'Dylan Bienstock',
  },
    {
      key: 'k',
      value: 'Katherine Lasonde',
    },
    {
        key: 'l',
        value: 'Lily Maechling',
    },
    {
      key: 'm',
      value: 'Morgan Sorbaro',
    }
  ]

  render() {
    return (
      <div className="all">
        <div className="dartCalLogoSearch">
          DartCal
          <div className="scheduleLogo">
              <a href="calendar" > 
              <img width="80px" src={logo}/>
              </a>
              </div>
        </div>
        <div className="searchBar">
          <p></p>
          <ReactSearchBox
          placeholder="Search Here!"
          value=""
          data={this.data}
          callback={record => console.log(record)}
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
                <img class="a" src="https://cs.dartmouth.edu/~albertoq/cs10/people/scott-gibbons.jpg" width="65%" height="65%"/>
                <p>Scott Gibbons</p>
              </div>
            </div>
            <div class="friendContainer">
              <div>
                <img class="a" src="https://cs.dartmouth.edu/~albertoq/cs10/people/morgan-sorbaro.jpg" width="65%" height="65%"/>
                <p>Morgan Sorbaro</p>
              </div>
            </div>
            <div class="friendContainer">
              <div>
                <img class="a" src="https://cs.dartmouth.edu/~albertoq/cs10/people/lily-maechling.jpg" width="65%" height="65%"/>
                <p>Lily Maechling</p>
              </div>
            </div> 
            <div class="friendContainer">
              <div>
                <img class="a" src="https://cs.dartmouth.edu/~albertoq/cs10/people/dylan-bienstock.jpg" width="65%" height="65%"/>
                <p>Dylan Bienstock</p>
              </div>
            </div>
            <div class="friendContainer">
              <div>
                <img class="a" src="https://images.squarespace-cdn.com/content/v1/551cbdc5e4b0cd11d2597487/1512060367564-IGT0WBWUIVLHVF09B841/ke17ZwdGBToddI8pDm48kEcIqZ-D2i5g-z-Jm45MtO97gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmnhdptcuU1alwky_sWs380ox8UhC6Zi9T53n4b7PpzvcsD7S2cubC6vFsaWXK1aWB/nnY62nCr.jpg?format=1000w" width="65%" height="65%"/>
                <p>Annika Kouhia</p>
              </div>
            </div>
          </div>
        </div>
        <Button>
          <div className="friend-triangle-left"></div>
        </Button>
        <div className="friend-triangle-right"></div>
      </div>
    )
  }
}

// export default NewPost;
export default withRouter((SearchFriends));

