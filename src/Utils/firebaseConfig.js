// firebaseConfig.js
import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBRTdMn8sZwWCjX074lqgGZFk_SSiF5Pp8",
    authDomain: "baladaeventos-5df67.firebaseapp.com",
    databaseURL: "https://baladaeventos-5df67-default-rtdb.firebaseio.com",
    projectId: "baladaeventos-5df67",
    storageBucket: "baladaeventos-5df67.appspot.com",
    messagingSenderId: "509613309278",
    appId: "1:509613309278:web:efe4e3eccf04a0825963cf",
    measurementId: "G-9M7BSERZNS"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;

