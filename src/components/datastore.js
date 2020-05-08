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

export function signOut () {
firebase.auth().signOut().then(() => {
  console.log('logged out');
      }).catch((error) => {
  console.log('wait, could not sign out');
      });
  }

export function getCurrUser(callBack) {
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
   
      // get the user id and accept a snapshot of information
      ourDB.ref(`users/${userID}`).on('value', (snapshot) => { 
        const currUser = snapshot.val(); // return the current user
        callBack(currUser); // call user into
        console.log(snapshot);
      });
}


export function getUserAndCal(callBack) {
  console.log("getting user");
  
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // get the user id and accept a snapshot of information
      ourDB.ref(`users/${user.uid}`).on('value', (snapshot) => { 
        const currUser = snapshot.val(); // return the current user
       // callBack(currUser); // call user into
    
        ourDB.ref(`users/${currUser.userID}/`).child('CalEvents').on('value', (snapshot) => {
          const calEvents = snapshot.val(); 
          callBack(calEvents, currUser)
  });
});
}
});
}

 
// returns an object/array
export function getFriends(userID, callback) {
  ourDB.ref(`users/${userID}/`).child('Friends').on('value', (snapshot) => {
    const friends = snapshot.val(); 
    if (friends != null) {
    callback(friends); }
  });
}

export function getFriendStatus(userID, callback) {
    const ref = ourDB.ref(`users/${userID}/`);
    ref.orderByValue().equalTo(userID).on('value', (snapshot) => {
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
  ourDB.ref(`users/${userID}/`).child('Classes').on('value', (snapshot) => {
    const classes = snapshot.val(); 
    if (classes != null) {
    callback(classes);
    }
  });
}

export function getClubs(userID, callback) {
      ourDB.ref(`users/${userID}/`).child('Clubs').on('value', (snapshot) => {
        const clubs = snapshot.val(); 
        if(clubs != null) {
        callback(clubs);}
        });
  }

  export function addFriend(userID, friendID) {
    const ref = ourDB.ref(`users/${userID}/Friends/`);
    ref.orderByValue().equalTo(friendID).on('value', (snapshot) => {
      if ((snapshot.numChildren()) === 0) {
        ourDB.ref(`users/${userID}/Friends/${friendID}`).set(friendID);
      }
    });
  }

  export function addClass(userID, classBlock, className) {
    const ref = ourDB.ref(`users/${userID}/Classes/`);
    ref.orderByValue().equalTo(classBlock).on('value', (snapshot) => {
      if ((snapshot.numChildren()) === 0) {
        ourDB.ref(`users/${userID}/Classes/${classBlock}`).set(className);
      }
    });
  }



  export function addClub(userID, clubID) {
    const ref = ourDB.ref(`users/${userID}/Clubs/`);
    ref.orderByValue().equalTo(clubID).on('value', (snapshot) => {
      if (snapshot.numChildren() === 0) {
        ourDB.ref(`users/${userID}/Clubs/${clubID}`).set(clubID);
      }
    });
  }

  export function incrementCalID(userID, num) {
    ourDB.ref(`users/${userID}/calID`).updateData({'calID': num.increment(1)});
  }

  export function addCalEvent(userID, calEventID, calEventInfo) {
    console.log("adding cal event")
    console.log(userID)
    console.log(calEventID)
    console.log(calEventInfo)
    const ref = ourDB.ref(`users/${userID}/`);
    ref.orderByValue().equalTo(calEventID).on('value', (snapshot) => {
     if (snapshot.numChildren() === 0) {
      ourDB.ref(`users/${userID}/CalEvents/${calEventID}`).set(calEventInfo);
     }
    });
  }

  export function getListOfUsers(callback) {
    const ref = ourDB.ref(`users/`); 
    ref.orderByChild().on('value', (snapshot) => {
      callback(snapshot);
    });
  }

  


  export function deleteCalEvent(userID, calEventID, callback) {
    firebase.database().ref(`users/${userID}/CalEvents`).child(calEventID).remove();
    ourDB.ref(`users/${userID}/`).child('CalEvents').on('value', (snapshot) => {
      const calEvents = snapshot.val(); 
      callback(calEvents)
   });
  }


  export function getCalEvents(userID, callback) {
    ourDB.ref(`users/${userID}/`).child('CalEvents').on('value', (snapshot) => {
     const calEvents = snapshot.val(); 
     callback(calEvents)
  });

   
  }; 
   

  // export function getClubStatus(userID, clubID) {
  //   const ref = ourDB.ref(`users/${userID}/`);
  //   ref.orderByValue().equalTo(clubID).on('value', (snapshot) => {
  //     callback(snapshot.numChildren());
  //   });
  // }

  export function getClassStatus(userID, classID, callback) {
    const ref = ourDB.ref(`users/${userID}/`);
    ref.orderByValue().equalTo(classID).on('value', (snapshot) => {
      console.log(snapshot);
      callback(snapshot.numChildren());
    });

  
}
