// Firebase SDK Import (App + Messaging)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging.js";

// Firebase config (آپ کا .env سے generate یا replace کریں)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

/**
 * Request browser notification permission
 * and retrieve FCM device token
 */
export async function requestNotificationPermission(userId) {
  try {
    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      alert("Please enable notifications to receive alerts.");
      return null;
    }

    console.log("Notification permission granted.");

    // Get FCM token
    const token = await getToken(messaging, {
      vapidKey: "YOUR_PUBLIC_VAPID_KEY" // Firebase Console > Cloud Messaging > Web Push certificates
    });

    if (token) {
      console.log("FCM Device Token:", token);

      // Save token in your backend for this user
      await fetch("/api/user/save-fcm-token", {
        method: "POST",
        headers: { 
          "Content-Type":"application/json",
          "Authorization": "Bearer " + localStorage.getItem("authToken")
        },
        body: JSON.stringify({ userId, token })
      });

      console.log("Token saved to backend");
      return token;
    } else {
      console.warn("No token received");
      return null;
    }

  } catch(err) {
    console.error("Notification permission error:", err.message);
    return null;
  }
}

/**
 * Listen to foreground messages
 */
export function listenForMessages() {
  onMessage(messaging, (payload) => {
    console.log("Message received:", payload);
    const { title, body } = payload.notification || {};
    if(title && body){
      new Notification(title, { body });
    }
  });
}
