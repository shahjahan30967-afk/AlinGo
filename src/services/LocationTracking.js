import Geolocation from 'react-native-geolocation-service';
import { db } from './firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';

export const startTracking = (riderId) => {
  Geolocation.watchPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      // ڈیٹا بیس میں لوکیشن اپ ڈیٹ کریں
      updateDoc(doc(db, "active_riders", riderId), {
        lat: latitude,
        lng: longitude,
        lastUpdated: new Date()
      });
    },
    (error) => console.log(error),
    { enableHighAccuracy: true, distanceFilter: 10 }
  );
};
