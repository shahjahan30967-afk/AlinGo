import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import Colors from '../../constants/Colors';

const OrderSummary = ({ navigation }) => {
  const cart = useSelector(state => state.cart);

  const placeOrder = () => {
    // یہاں بیک اینڈ API کو کال کریں گے تاکہ آرڈر ڈیٹا بیس میں محفوظ ہو جائے
    alert("آرڈر موصول ہو گیا ہے! شکریہ Alingo Food استعمال کرنے کا۔");
    navigation.popToTop(); // واپس ہوم اسکرین پر لے جائیں
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>آرڈر کی تفصیلات</Text>
      
      <FlatList
        data={cart.items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Text>{item.name} x {item.quantity}</Text>
            <Text>Rs. {item.price * item.quantity}</Text>
          </View>
        )}
      />

      <View style={styles.totalBox}>
        <View style={styles.totalRow}>
          <Text>کل رقم:</Text>
          <Text style={styles.totalText}>Rs. {cart.totalAmount}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text>ڈلیوری فیس:</Text>
          <Text>Rs. 50</Text>
        </View>
        <View style={[styles.totalRow, { marginTop: 10, borderTopWidth: 1, paddingTop: 10 }]}>
          <Text style={{fontWeight: 'bold'}}>ٹوٹل بل:</Text>
          <Text style={styles.grandTotal}>Rs. {cart.totalAmount + 50}</Text>
        </View>

        <TouchableOpacity style={styles.placeOrderBtn} onPress={placeOrder}>
          <Text style={styles.btnText}>آرڈر بک کریں</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  totalBox: { borderTopWidth: 1, borderColor: '#eee', paddingTop: 20 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  totalText: { fontSize: 16 },
  grandTotal: { fontSize: 20, fontWeight: 'bold', color: Colors.primary },
  placeOrderBtn: { backgroundColor: Colors.primary, padding: 18, borderRadius: 12, marginTop: 25, alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});

export default OrderSummary;
