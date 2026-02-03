import admin from "../config/firebase-admin.js"; // Firebase Admin already initialized

/**
 * Send FCM Push Notification
 * @param {string} deviceToken - FCM device token
 * @param {string} title - Notification title
 * @param {string} body - Notification body
 */
export async function sendPushNotification(deviceToken, title, body) {
  if(!deviceToken) throw new Error("Device token missing");

  const message = {
    token: deviceToken,
    notification: { title, body },
    android: { priority: "high" },
    apns: { headers: { "apns-priority":"10" } }
  };

  try{
    const response = await admin.messaging().send(message);
    console.log("Push Notification Sent:", response);
  }catch(err){
    console.error("Push Notification Failed:", err.message);
    throw err;
  }
}
