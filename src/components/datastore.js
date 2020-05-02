import firebase from 'firebase'
import noUserPic from '../pictures/noUser.png'


const firebaseConfig = {
    apiKey: "AIzaSyDrCgRkz4jQR0tRVrWkamdSxoqQhh18YM0",
    authDomain: "dartcal-d198f.firebaseapp.com",
    databaseURL: "https://dartcal-d198f.firebaseio.com",
    projectId: "dartcal-d198f",
    storageBucket: "dartcal-d198f.appspot.com",
    //messagingSenderId: "998609505236",
    //appId: "1:998609505236:web:08d07a52ef8fd4baf12441",
    //measurementId: "G-9CMQHTZN1V"
  };

  firebase.initializeApp(firebaseConfig);
  const ourDB = firebase.database();
  const ourAuth = firebase.auth();
  
  export function createUser (
    userID, userEmail, userFirstName, userLastName, userYear,) {
    
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase.database().ref(`users/${user.uid}`).set({
          userID,
          userEmail,
          userFirstName,
          userLastName,
          userYear,
          userPic: noUserPic,
        });
      }
    });
}

export function getCurrUser(callBack) {
  console.log("getting user");
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // get the user id and accept a snapshot of information
      ourDB.ref(`users/${user.uid}`).on('value', (snapshot) => { 
        const currUser = snapshot.val(); // return the current user
        callBack(currUser); // call user into
      });
  }
});
}

export function getUser(userID, callBack) {
  console.log("getting user");
  
      // get the user id and accept a snapshot of information
      ourDB.ref(`users/${userID}`).on('value', (snapshot) => { 
        const currUser = snapshot.val(); // return the current user
        callBack(currUser); // call user into
  });
}
 
// returns an object/array
export function getFriends(userID, callback) {
  ourDB.ref(`users/${userID}/`).child('Friends').on('value', (snapshot) => {
    const friends = snapshot.val(); 
    console.log("hi");
    console.log(friends)
    console.log("boo")
    callback(friends);
  });
}

// will return either 0 or 1
export function getFriendStatus(userID, friendID, callback) {
    const ref = ourDB.ref(`users/${userID}/`);
    ref.orderByValue().equalTo(friendID).on('value', (snapshot) => {
      callback(snapshot.numChildren());
    });
  }

export function getImage(userID, callback) {
  ourDB.ref(`users/${userID}/`).child('userPic').on('value', (snapshot) => {
    const pic = snapshot.val(); 
    callback(pic)
  });
}

export function getName(userID, callback) {
  ourDB.ref(`users/${userID}/`).child('userFirstName').on('value', (snapshot) => {
  const name = snapshot.val(); 
  
  callback(name);
  });
}

export function getClass(userID, callback) {
  ourDB.ref(`users/${userID}/`).child('classList').on('value', (snapshot) => {
    const classes = snapshot.val(); 
    callback(classes)
  });
}

export function getClubs(userID, callback) {
      ourDB.ref(`users/${userID}/`).child('clubList').on('value', (snapshot) => {
        const clubs = snapshot.val(); 
        callback(clubs)
        });
  }

  export function getClubStatus(userID, cludID, callback) {
    const ref = ourDB.ref(`users/${userID}/`);
    ref.orderByValue().equalTo(cludID).on('value', (snapshot) => {
      callback(snapshot.numChildren());
    });
  }

  export function addFriend(userID, friendID) {
    if (Number(getFriendStatus(userID, friendID)) === 0) {
    firebase.database().ref(`users/${userID}/Friends`).push(friendID);
    }
  }

  export function addClub(userID, clubID) {
    if (Number(getFriendStatus(userID, clubID)) === 0) {
    firebase.database().ref(`users/${clubID}/Clubs`).push(clubID);
  }
}