import firebase from "firebase";
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC0YvUqUF7aJX_iLLECtIg-pKif4VcDOfE",
    authDomain: "scooterapp-42ab1.firebaseapp.com",
    projectId: "scooterapp-42ab1",
    storageBucket: "scooterapp-42ab1.appspot.com",
    messagingSenderId: "743109985441",
    appId: "1:743109985441:web:5fdf760dc4e521074c5ce0"
  };

firebase.initializeApp(firebaseConfig);
export default firebase;