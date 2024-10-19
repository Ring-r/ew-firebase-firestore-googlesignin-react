import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC9rN9TifmVDASDCjfc2zNjjWdh4_qOOiA",
  authDomain: "ew-firebase-9e33d.firebaseapp.com",
  projectId: "ew-firebase-9e33d",
  storageBucket: "ew-firebase-9e33d.appspot.com",
  messagingSenderId: "477337721653",
  appId: "1:477337721653:web:5dfae78fd3fe0468284a7c",
  measurementId: "G-T9VFPB5YVQ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };
