import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCh4KOfBb9mEJzZLWuSdPQsyopPxLimazs",
  authDomain: "isv-e-commerce.firebaseapp.com",
  projectId: "isv-e-commerce",
  storageBucket: "isv-e-commerce.appspot.com",
  messagingSenderId: "984153977649",
  appId: "1:984153977649:web:746490a7245796f0e4f610"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();

export default function getFirestoreApp() {
  return app;
};