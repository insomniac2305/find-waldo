 import { initializeApp } from "firebase/app";
 import { getFirestore } from "firebase/firestore";
 
 const firebaseConfig = {
  apiKey: "AIzaSyCIKK-Vzzt9Ft6ATxcGydUQa07b2UwT6JM",
  authDomain: "find-waldo-60bf1.firebaseapp.com",
  projectId: "find-waldo-60bf1",
  storageBucket: "find-waldo-60bf1.appspot.com",
  messagingSenderId: "451167570713",
  appId: "1:451167570713:web:9b502ec48259597c0c1388",
};
 
 const app = initializeApp(firebaseConfig);
 
 export default getFirestore(app);