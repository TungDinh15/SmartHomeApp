
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAAzwgzgsZblYz-9kUPqZp5-87H0BJbQSI",
  authDomain: "smarthome-thesis.firebaseapp.com",
  databaseURL: "https://smarthome-thesis-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smarthome-thesis",
  storageBucket: "smarthome-thesis.appspot.com",
  messagingSenderId: "327776767210",
  appId: "1:327776767210:web:31876852fab7166422db93",
  measurementId: "G-J9L7PFC9P9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);



