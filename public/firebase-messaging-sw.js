// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js');
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js');

const firebaseConfig = {
  apiKey: "AIzaSyB4_gPk-d-3lqpV4sg1mOuxu_H7c-aQfMc",
  authDomain: "development-5d13b.firebaseapp.com",
  projectId: "development-5d13b",
  storageBucket: "development-5d13b.appspot.com",
  messagingSenderId: "46930462088",
  appId: "1:46930462088:web:67379bc42c48089581a63d",
  measurementId: "G-0TM26LDWGK"
  };
  
// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: './logo.png',
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});