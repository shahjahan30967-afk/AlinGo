// services/notification.service.js

import admin from "../config/firebase-admin.js";
import User from "../models/User.model.js";

/**
 * 🔔 Send Push Notification (User ID OR Direct Token)
 * 
 * @param {Object} options
 * @param {String} [options.userId]   - MongoDB User ID (optional)
 * @param {String} [options.token]    - Direct FCM token (optional)
 * @param {String} options.title      - Notification title
 * @param {String} options.body       - Notification body
 * @param {Object} [options.data]     - Extra payload (rideId, walletId etc.)
 */
export async function sendPushNotification({
  userId,
  token,
  title,
  body,
  data = {}
}) {
  try {
    let fcmToken = token;

    // 🔗 اگر userId دیا گیا ہے تو DB سے token نکالیں
    if (!fcmToken && userId) {
      const user = await User.findById(userId).select("fcmToken");
      if (!user || !user.fcmToken) {
        console.log("🔕 No FCM token found for user:", userId);
        return;
      }
      fcmToken = user.fcmToken;
    }

    if (!fcmToken) {
      console.log("⚠️ Push skipped: No token provided");
      return;
    }

    const message = {
      token: fcmToken,

      notification: {
        title,
        body
      },

      data: Object.fromEntries(
        Object.entries(data).map(([k, v]) => [k, String(v)])
      ),

      android: {
        priority: "high",
        notification: {
          sound: "default"
        }
      },

      apns: {
        headers: {
          "apns-priority": "10"
        },
        payload: {
          aps: {
            sound: "default"
          }
        }
      }
    };

    const response = await admin.messaging().send(message);
    console.log("✅ Push sent:", response);
    return response;

  } catch (error) {
    console.error("❌ Push Notification Error:", error.message);
    throw error;
  }
}
