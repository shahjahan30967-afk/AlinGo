import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import Colors from '../../constants/Colors';

const DetailsScreen = ({ route, navigation }) => {
  const { restaurant } = route.params;
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const renderMenuItem = ({ item }) => (
    <View style={styles.menuItem}>
      <View style={{ flex: 1 }}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDesc}>{item.description}</Text>
        <Text style={styles.itemPrice}>Rs. {item.price}</Text>
      </View>
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => dispatch(addToCart(item))}
      >
        <Text style={styles.addText}>+</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Image source={{ uri: restaurant.image }} style={styles.banner} />
      <View style={styles.infoBox}>
        <Text style={styles.title}>{restaurant.name}</Text>
        <Text>⭐ {restaurant.rating} • {restaurant.deliveryTime}</Text>
      </View>

      <FlatList
        data={restaurant.menu}
        keyExtractor={(item) => item.id}
        renderItem={renderMenuItem}
        contentContainerStyle={{ padding: 20 }}
      />

      {/* نیچے والی ٹوکری پٹی (Floating Cart Bar) */}
      {cartItems.length > 0 && (
        <TouchableOpacity 
          style={styles.cartBar}
          onPress={() => navigation.navigate('Cart')}
        >
          <Text style={styles.cartBarText}>{cartItems.length} آئٹمز | ٹوکری دیکھیں</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  banner: { width: '100%', height: 200 },
  infoBox: { padding: 20, borderBottomWidth: 1, borderBottomColor: '#eee' },
  title: { fontSize: 24, fontWeight: 'bold', color: Colors.secondary },
  menuItem: { flexDirection: 'row', marginBottom: 25, alignItems: 'center' },
  itemName: { fontSize: 18, fontWeight: '600' },
  itemDesc: { color: '#777', fontSize: 13 },
  itemPrice: { fontSize: 16, color: Colors.primary, fontWeight: 'bold', marginTop: 5 },
  addButton: { backgroundColor: Colors.primary, width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  addText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  cartBar: { backgroundColor: Colors.primary, padding: 20, position: 'absolute', bottom: 20, left: 20, right: 20, borderRadius: 15, alignItems: 'center' },
  cartBarText: { color: '#fff', fontSize: 18, fontWeight: 'bold' }
});

export default DetailsScreen;
