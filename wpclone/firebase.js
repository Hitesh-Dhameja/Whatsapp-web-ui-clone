// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD-hBHntkb04c4viK5VzEarDNQVpGgEl_0",
  authDomain: "whatsapp-22b51.firebaseapp.com",
  projectId: "whatsapp-22b51",
  storageBucket: "whatsapp-22b51.appspot.com",
  messagingSenderId: "654348823351",
  appId: "1:654348823351:web:ccb5859df3683fff4848b2",
  measurementId: "G-8ME70PGT84"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);