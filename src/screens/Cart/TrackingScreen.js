import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import Colors from '../../constants/Colors';

const TrackingScreen = () => {
  // فرضی رائیڈر لوکیشن (حقیقت میں یہ ڈیٹا بیس سے آئے گی)
  const [riderLocation, setRiderLocation] = useState({
    latitude: 31.5204,
    longitude: 74.3587,
  });

  const restaurantLocation = { latitude: 31.5250, longitude: 74.3500 };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          ...riderLocation,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {/* ریسٹورنٹ کا مارکر */}
        <Marker coordinate={restaurantLocation} title="Alingo Restaurant">
            <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/4320/4320337.png'}} style={{width: 40, height: 40}} />
        </Marker>

        {/* رائیڈر کا مارکر */}
        <Marker coordinate={riderLocation} title="Rider is here">
            <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/2972/2972185.png'}} style={{width: 40, height: 40}} />
        </Marker>
      </MapView>

      <View style={styles.statusCard}>
        <Text style={styles.statusTitle}>آپ کا کھانا رائیڈر کے پاس ہے!</Text>
        <Text style={styles.timeText}>پہنچنے کا وقت: 10 منٹ</Text>
        <View style={styles.riderInfo}>
            <Image source={{uri: 'https://via.placeholder.com/50'}} style={styles.avatar} />
            <View>
                <Text style={{fontWeight: 'bold'}}>احمد علی (Alingo Rider)</Text>
                <Text style={{color: '#666'}}>Honda CD-70 | LEC-1234</Text>
            </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  statusCard: { 
    position: 'absolute', bottom: 30, left: 20, right: 20, 
    backgroundColor: '#fff', padding: 20, borderRadius: 20, elevation: 10 
  },
  statusTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.primary },
  timeText: { fontSize: 14, color: '#333', marginBottom: 15 },
  riderInfo: { flexDirection: 'row', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 15 },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 15 }
});

export default TrackingScreen;
