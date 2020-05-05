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
import search from '../pictures/magnifying-glass.png'

//import './calendar.css';

class SearchFriends extends React.Component {
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
        <div className="dartCalLogoSearch">
          DartCal
          <div className="scheduleLogo"><img width="80px" src={logo}/></div>
        </div>
        <div className="searchBar">
          <img width="40px" src={search} style={{ 'vertical-align':'middle' }}/>
          <input type="text" width="40px" placeholder="Search" className="shortSearch" ></input>
        </div>
        <div className="clubHeader">Clubs:</div>
        <div className="clubSection">
          <div class="clubBrowse">
            <div class="clubContainer">
              <div>
                <img class="a" src="https://engineering.dartmouth.edu/assets/mag/2011/08/KML_2576_adj.jpg" width="65%" height="65%"/>
                <p>Dartmouth Formula Racing</p>
              </div>
            </div>
            <div class="clubContainer">
              <div>
                <img class="a" src="https://live.staticflickr.com/7271/7088587775_35b4b1efc1_b.jpg" width="65%" height="65%"/>
                <p>Dartmouth Chess Club</p>
              </div>
            </div>
            <div class="clubContainer">
              <div>
                <img class="a" src="https://i.ytimg.com/vi/if-2M3K1tqk/maxresdefault.jpg" width="65%" height="65%"/>
                <p>Dartmouth D-Trade</p>
              </div>
            </div> 
            <div class="clubContainer">
              <div>
                <img class="a" src="https://web.cs.dartmouth.edu/sites/cs.dartmouth.edu/files/styles/basic_article_slideshow/public/1_Entry.jpg?itok=BJ3MfsH0" width="65%" height="65%"/>
                <p>Dali Lab</p>
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

