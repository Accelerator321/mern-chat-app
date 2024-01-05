import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// import 'firebase/compat/firestore';

export const auth  = firebase.initializeApp(
    {
        apiKey: "AIzaSyD5UG0VfaHEV1XpChZd60vFR29t58b85w4",
        authDomain: "chat-app-52855.firebaseapp.com",
        projectId: "chat-app-52855",
        storageBucket: "chat-app-52855.appspot.com",
        messagingSenderId: "565614873898",
        appId: "1:565614873898:web:a8b002ee11f93f60b52253",
        measurementId: "G-2H1B9SYD8J"
      }
).auth();