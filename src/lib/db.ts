// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getMessaging, getToken } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB4_gPk-d-3lqpV4sg1mOuxu_H7c-aQfMc",
  authDomain: "development-5d13b.firebaseapp.com",
  projectId: "development-5d13b",
  storageBucket: "development-5d13b.appspot.com",
  databaseURL: "https://development-5d13b-default-rtdb.asia-southeast1.firebasedatabase.app",
  messagingSenderId: "46930462088",
  appId: "1:46930462088:web:67379bc42c48089581a63d",
  measurementId: "G-0TM26LDWGK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);
export const database = getDatabase(app);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("../../firebase-messaging-sw.js")
    .then(function (registration) {
      console.log("Registration successful, scope is:", registration.scope);
    })
    .catch(function (err) {
      console.log("Service worker registration failed, error:", err);
    });
}
function requestPermission() {
  console.log("Requesting permission...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification permission granted.");
      getToken(messaging, {
        vapidKey:"BEcimnuUGOue2S7pL4JdHgaGjYHsuRZXNhfsD0TOz2rNVVU973uinsu5UP6m7fzsulhs6UAQXUyX-NZQvolSSLI",
      }).then((currentToken) => {
        if (currentToken) {
          console.log("currentToken: ", currentToken);
        } else {
          console.log("Can not get token");
        }
      });
    } else {
      console.log("Do not have permission!");
    }
  });
}

requestPermission();
