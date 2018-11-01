import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";

// Reducers
// @todo

// Copied from firebase webpage
const firebaseConfig = {
  apiKey: "AIzaSyBleDSKNueMoqNzorDlx-b1eQe0ICcL8rE",
  authDomain: "reactclientpanel-3adb9.firebaseapp.com",
  databaseURL: "https://reactclientpanel-3adb9.firebaseio.com",
  projectId: "reactclientpanel-3adb9",
  storageBucket: "reactclientpanel-3adb9.appspot.com",
  messagingSenderId: "81408088133"
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// Initialized the firebase instance
firebase.initializeApp(firebaseConfig);
// Init the firestore
const firestore = firebase.firestore;

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig) // firebase instance as first argument
  // reduxFirestore(firebase) // <- needed if using firestore
)(createStore);


const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer 
  });

  // Create initial state
  const initialState = {};

  // Create store
  const store = createStoreWithFirebase(rootReducer, initialState, compose(
      reactReduxFirebase(firebase),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ));  

  export default store;