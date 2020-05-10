/* eslint no-alert: 0 */
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Input } from 'reactstrap';
import firebase from 'firebase';
import logo from '../pictures/calendar.png';
import noUserPic from '../pictures/noUser.png'
import blankPic from '../pictures/nofriend.png'
import { NavLink, withRouter } from 'react-router-dom';
import * as db from './datastore';
import '../cssfolder/profile.css';
import noFriends from '../pictures/nofriend.png';



class FriendProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userID: 'no user ID',
      userEmail: 'no email',
      userFirstName: ' first ',
      userLastName: ' last ',
      userFullName: 'username',
      userYear: 'no year',
      friendsIDs: [],
      friendsPics: [],
      friendsNames: [],
      friendsNamesOfficial: [],
      bio: '',
      image: noUserPic,
      newClub: '',
      newClass: '',
      classes: '',
      classList: [],
      clubList: [],
      editing: false,
    };  
    }

   
    
    
    
    componentDidMount() {
    }

    populateFriendPage = (currUser, friendID) => {
      db.getCurrUser(this.setCurrUser);
    }

     setCurrUser = (currUser) => {
    

      this.setState({
         userID: currUser.userID,
         userEmail: currUser.userEmail,
         userFirstName: currUser.userFirstName,
         userLastName: currUser.userLastName,
         userYear: currUser.userYear,
         image: currUser.userPic,
         editing: false,
       });
 
       if(currUser.Clubs != null) {
       var ClubList = []
       for (let i = 0; i < Object.keys(currUser.Clubs).length; i += 1) {
         const currentKey = Object.keys(currUser.Clubs)[i];
         const currItem = currUser.Clubs[currentKey];
   
         ClubList.push(currItem);
 
         this.setState ({
           clubList: ClubList,
 
         })
     
       }
     }
 
     if(currUser.Classes != null) {
     var Class = []
       for (let i = 0; i < Object.keys(currUser.Classes).length; i += 1) {
         const currentKey = Object.keys(currUser.Classes)[i];
         const currItem = currUser.Classes[currentKey];
   
        Class.push(` ${currItem} (${currentKey})`);
 
        this.setState ({
          classList: Class
        })
     
       }
     }
     if(currUser.Friends != null) {
     this.state.friendsPics = []
     this.state.friendsNames = []
 
     for (let i = 0; i < Object.keys(currUser.Friends).length; i += 1) {
       const currentKey = Object.keys(currUser.Friends)[i];
       const currItem = currUser.Friends[currentKey];
      db.getUser(currItem, this.setFriendInfo);
     
     }
   }
   
   }
   
   setFriendInfo = (user) => {
     var pics = this.state.friendsPics
     var names = this.state.friendsNames
     var IDs = this.state.friendsIDs
     pics.push(user.userPic);
     names.push(`${user.userFirstName} ${user.userLastName}`);
     IDs.push(user.userID);
 
     this.setState({
       friendsPics: pics,
       friendsNames: names,
       friendsIDs: IDs,
     })
   }
 

   renderClubs = () => {
 
    return (
      <div> 
         <ul>
         { (this.state.clubList.length > 0) 
        ? <li>{this.state.clubList[0]}</li>
        : <div> </div>
         }
         { (this.state.clubList.length > 1) 
        ? <li>{this.state.clubList[1]}</li>
        : <div> </div>
         }
         { (this.state.clubList.length > 2) 
        ? <li>{this.state.clubList[2]}</li>
        : <div> </div>
         }
         { (this.state.clubList.length > 3) 
        ? <li>{this.state.clubList[3]}</li>
        : <div> </div>
         }
         </ul>
        </div>
     );
  }


  renderClasses = () =>  {
     
    return (
      <div> 
      <ul>
      { (this.state.classList.length > 0) 
     ? <li>{this.state.classList[0]}</li>
     : <div> </div>
      }
      { (this.state.classList.length > 1) 
     ? <li>{this.state.classList[1]}</li>
     : <div> </div>
      }
      { (this.state.classList.length > 2) 
     ? <li>{this.state.classList[2]}</li>
     : <div> </div>
      }
      { (this.state.classList.length > 3) 
     ? <li>{this.state.classList[1]}</li>
     : <div> </div>
      }
      {this.state.editing && (this.state.classList.length < 4)
        ?    <li>
        <Input className="response" placeholder="ex. ENGL37" onChange={this.onClassChange} value={this.state.newClass} />
        <div class="dropdown">
          <button class="dropbtn">Class Block</button>
          <div class="dropdown-content">
            <a href="#">8</a>
            <a href="#">9S</a>
            <a href="#">9L</a>
            <a href="#">10</a>
            <a href="#">11</a>
            <a href="#">12</a>
            <a href="#">2</a>
            <a href="#">3A</a>
            <a href="#">6A</a>
            <a href="#">10A</a>
            <a href="#">2A</a>
            <a href="#">3B</a>
            <a href="#">6B</a>
          </div>
        </div>
      </li> 
       : <div></div>
      }
      </ul>
     </div>
  );

 

}

  renderButton = () => {


  }
  render() {
    return (
      <div className="all">
        <NavLink to="/calendar" class="logo">
            <div className="dartCalLogoProfile">
                DartCal
                <div className="scheduleLogo"><img width="80px" src={logo}/></div>
            </div>
        </NavLink>
        <div className="profileinfo">
          <div>
            <h3 className="sectionHeader">Profile</h3>
            <div className="imgStyle">
              <img class="a" src={this.state.image} width="150" height="150"/>
            </div>
          </div>
          <div className="nameContainer">
            <h6>Name</h6>
            <h6>Email</h6>
            <h6>Year</h6>
          </div>
          <div className="inputContainer">
            <div className="indivInput">
              <h6>{`${this.state.userFirstName} ${this.state.userLastName}`}</h6>
            </div>
            <div className="indivInput">
              <h6>{this.state.userEmail}</h6>
            </div>
            <div className="indivInput">
              <h6>{this.state.userYear}</h6>
            </div>
          </div>
        </div>

        <div className="classinfo">
          <div>
            <h3 className="sectionHeader">{`${this.state.userFirstName}`}'s Classes</h3>
          </div>
          <div className="listStyle">
           {this.renderClasses()}
          </div>
        </div>

        <div className="clubinfo">
          <div>
            <h3 className="sectionHeader">Clubs</h3>
          </div>
          <div className="listStyle">

          {this.renderClubs()}
                   
          </div>
        </div>

        <div className="friendsinfo">
          <div>
            <h3 className="sectionHeader">Friends</h3>
          </div>
          <div class="grid-container">
            <div class="grid-item">
              <div className="imgStyle">
                <img class="a" src={this.state.friendsPics[0]} width="55%" height="55%"/>
                <p>{this.state.friendsNames[0]}</p>
              </div>
            </div>
              <div class="grid-item">
              <div className="imgStyle">
                <img class="a" src={this.state.friendsPics[1]} width="55%" height="55%"/>
                <p>{this.state.friendsNames[1]}</p>
              </div>
            </div>
            <div class="grid-item">
              <div className="imgStyle">
                <img class="a" src={this.state.friendsPics[2]} width="55%" height="55%"/>
                <p>{this.state.friendsNames[2]}</p>
              </div>
            </div>  
            <div class="grid-item">
              <div className="imgStyle">
                <img class="a" src={this.state.friendsPics[3]} width="55%" height="55%"/>
                <p>{this.state.friendsNames[3]}</p>
              </div>
            </div>
            <div class="grid-item">
              <div className="imgStyle">
                <img class="a" src={this.state.friendsPics[4]} width="55%" height="55%"/>
                <p>{this.state.friendsNames[4]}</p>
              </div>
            </div>
            <div class="grid-item">
              <div className="imgStyle">
                <img class="a" src={this.state.friendsPics[5]} width="55%" height="55%"/>
                <p>{this.state.friendsNames[5]}</p>
              </div></div> 
          </div>
        </div>
        <div className="editOrFollowButton">
          <Button>Friend {`${this.state.userFirstName}`}</Button>
        </div>
      </div>
    );
  }
}



// export default NewPost;
export default withRouter((FriendProfile));