import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Colors from '../../constants/Colors';

const AddressScreen = ({ navigation }) => {
  const [region, setRegion] = useState({
    latitude: 31.5204, // لاہور کی ڈیفالٹ لوکیشن (مثال کے طور پر)
    longitude: 74.3587,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region}
        onRegionChangeComplete={(reg) => setRegion(reg)}
      >
        <Marker coordinate={region} title="آپ کا مقام" />
      </MapView>

      <View style={styles.footer}>
        <Text style={styles.addressTitle}>ڈلیوری کہاں کرنی ہے؟</Text>
        <Text style={styles.addressText}>نقشے پر پن کو اپنے گھر کے اوپر رکھیں</Text>
        
        <TouchableOpacity 
          style={styles.confirmButton}
          onPress={() => navigation.navigate('OrderSummary', { location: region })}
        >
          <Text style={styles.buttonText}>اس جگہ کی تصدیق کریں</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  footer: { 
    position: 'absolute', bottom: 0, left: 0, right: 0, 
    backgroundColor: '#fff', padding: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20,
    elevation: 10
  },
  addressTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  addressText: { color: '#666', marginBottom: 20 },
  confirmButton: { backgroundColor: Colors.primary, padding: 15, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' }
});

export default AddressScreen;
