/* #1 - The Firebase setup code goes here  - both imports, `firebaseConfig` and `app` */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getDatabase, ref, set, push, onValue, get, update } from  "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
  
// Your web app's Firebase configuration
const firebaseConfig = 
{
  apiKey: "AIzaSyDHFAl5AWLUTCSl2DY1YwaHjCQp42a_wzI",
  authDomain: "high-scores-3e7a1.firebaseapp.com",
  projectId: "high-scores-3e7a1",
  storageBucket: "high-scores-3e7a1.appspot.com",
  messagingSenderId: "741194741862",
  appId: "1:741194741862:web:cb209e140cb75cfa1dd5a7"
};
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app); // make sure firebase is loaded
const db = getDatabase();
const parksRef = ref(db, 'park-pop');


// #2 NEW STUFF
/*
const scoresChanged = (snapshot) => 
{
    snapshot.forEach(score => {
      const childKey = score.key;
      const childData = score.val();
      console.log(childData);
      console.log(childKey,childData);
    });
}*/


// This is the "harder" way and not necessary for incrementing a counter
// But this code is useful if you want to `get()` a value just once
// and/or do "batch" updates of non-numeric values with `update()`
const writeFavParkData = (id,name) => {
    const db = getDatabase();
    const favRef = ref(db, 'favorites/' + id);
  
    // does it already exist?
    // get will just look once
    get(favRef).then(snapshot => {
      let favorite;
      if (snapshot.exists()) {
        // if it's already in "favorites/" - update the number of likes
        favorite = snapshot.val();
        console.log("found - current values=",favorite);
        const likes = favorite.likes + 1;
        const newData = {
          name,
          id,
          likes
        };
        const updates = {};
        updates['favorites/' + id] = newData;
        update(ref(db), updates);
      } else {
        // if it does not exist, add to "mostFavorited/"
        console.log(`No favorite of key='${id}' found`);
        console.log("favorite=",favorite);
        set(favRef, {
          name,
          id,
          likes: 1
        });
      }
    }).catch((error) => {
      console.error(error);
    });
}

export {onValue, writeFavParkData,parksRef};//(parksRef,scoresChanged);