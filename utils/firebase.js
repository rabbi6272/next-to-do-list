import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD8ID9W8VMZ3earRAV75BMEsaPM5ryQyPI",
  authDomain: "o-do-list.firebaseapp.com",
  projectId: "o-do-list",
  storageBucket: "o-do-list.firebasestorage.app",
  messagingSenderId: "420850973531",
  appId: "1:420850973531:web:f7060431b9fc08c6b9f87e",
  measurementId: "G-6HN3356F6X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
