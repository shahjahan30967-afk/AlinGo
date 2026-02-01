import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Colors from '../../constants/Colors';

const NewRequest = ({ navigation }) => {
  // یہ ڈیٹا بیک اینڈ سے آئے گا جب نیا آرڈر ہوگا
  const orderDetails = {
    id: '#AL-9921',
    restaurant: 'Alingo Burger Hub',
    address: 'گلبرگ III، لاہور',
    total: 'Rs. 1,250',
    distance: '3.2 km'
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>نیا آرڈر دستیاب ہے!</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.orderId}>آرڈر ID: {orderDetails.id}</Text>
        <Text style={styles.resName}>{orderDetails.restaurant}</Text>
        <Text style={styles.address}>📍 {orderDetails.address}</Text>
        
        <View style={styles.infoRow}>
            <Text style={styles.infoText}>فاصلہ: {orderDetails.distance}</Text>
            <Text style={styles.infoText}>کمائی: Rs. 150</Text>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.declineBtn}
            onPress={() => alert('آرڈر مسترد کر دیا گیا')}
          >
            <Text style={styles.declineText}>مسترد کریں</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.acceptBtn}
            onPress={() => navigation.navigate('DeliveryMap')}
          >
            <Text style={styles.acceptText}>قبول کریں</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA', padding: 20 },
  header: { alignItems: 'center', marginVertical: 30 },
  headerText: { fontSize: 24, fontWeight: 'bold', color: Colors.primary },
  card: { backgroundColor: '#fff', padding: 20, borderRadius: 20, elevation: 5 },
  orderId: { color: '#999', fontSize: 14 },
  resName: { fontSize: 20, fontWeight: 'bold', marginVertical: 10 },
  address: { fontSize: 16, color: '#555', marginBottom: 15 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#eee', paddingTop: 15 },
  infoText: { fontWeight: 'bold', color: Colors.secondary },
  actionButtons: { flexDirection: 'row', marginTop: 25, justifyContent: 'space-between' },
  acceptBtn: { backgroundColor: '#27ae60', padding: 15, borderRadius: 10, width: '48%', alignItems: 'center' },
  declineBtn: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#e74c3c', padding: 15, borderRadius: 10, width: '48%', alignItems: 'center' },
  acceptText: { color: '#fff', fontWeight: 'bold' },
  declineText: { color: '#e74c3c', fontWeight: 'bold' }
});

export default NewRequest;
