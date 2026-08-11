importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js"
);

importScripts(
  "https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyDWQBRRnoJdwD19BTln7dQQTlkVCNO9nEU",
  authDomain: "full-stack-71cb0.firebaseapp.com",
  projectId: "full-stack-71cb0",
  storageBucket: "full-stack-71cb0.firebasestorage.app",
  messagingSenderId: "503728088034",
  appId: "1:503728088034:web:bc820de155da9813ad0fbb",
  measurementId: "G-998BPWE3KB"
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Background message:", payload);

  self.registration.showNotification(
    payload.notification.title,
    {
      body: payload.notification.body,
    }
  );
});