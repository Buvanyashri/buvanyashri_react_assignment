import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC4Dyw1eSqH0KnpwLmXRlKNzXKGc6XoWa8",
  authDomain: "buvanyashri-6bfbb.firebaseapp.com",
  projectId: "buvanyashri-6bfbb",
  storageBucket: "buvanyashri-6bfbb.appspot.com",
  messagingSenderId: "165833195083",
  appId: "1:165833195083:web:d0b9c3b43a40459b4d57ce"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {db};