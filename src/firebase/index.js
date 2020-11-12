// import firebase from 'firebase/app';
import firebase from 'firebase';
import 'firebase/firestore';

import firebaseConfig from './firebaseConfig';

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
// export default firebaseApp.firestore();
export default firebase.firestore();