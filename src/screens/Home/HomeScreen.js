import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import { CATEGORIES, RESTAURANTS } from '../../constants/Data';

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      {/* سرچ بار (صرف ڈیزائن کے لیے) */}
      <View style={styles.searchBar}>
        <Text style={{color: '#999'}}>کھانا یا ریسٹورنٹ تلاش کریں...</Text>
      </View>

      {/* کیٹیگریز لسٹ */}
      <Text style={styles.sectionTitle}>کیٹیگریز</Text>
      <FlatList 
        horizontal
        showsHorizontalScrollIndicator={false}
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.categoryCard}>
            <Image source={{ uri: item.image }} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{item.name}</Text>
          </View>
        )}
      />

      {/* ریسٹورنٹس لسٹ */}
      <Text style={styles.sectionTitle}>مشہور ریسٹورنٹس</Text>
      {RESTAURANTS.map((item) => (
        <TouchableOpacity 
          key={item.id} 
          style={styles.resCard}
          onPress={() => navigation.navigate('Details', { restaurant: item })}
        >
          <Image source={{ uri: item.image }} style={styles.resImage} />
          <View style={styles.resInfo}>
            <Text style={styles.resName}>{item.name}</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text>⭐ {item.rating}</Text>
                <Text style={{color: Colors.primary}}>{item.deliveryTime}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fdfdfd', padding: 15 },
  searchBar: { backgroundColor: '#eee', padding: 15, borderRadius: 10, marginBottom: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginVertical: 15 },
  categoryCard: { alignItems: 'center', marginRight: 20 },
  categoryImage: { width: 60, height: 60, borderRadius: 30 },
  categoryText: { marginTop: 5, fontWeight: '500' },
  resCard: { backgroundColor: '#fff', borderRadius: 15, marginBottom: 20, elevation: 4, overflow: 'hidden' },
  resImage: { width: '100%', height: 180 },
  resInfo: { padding: 15 },
  resName: { fontSize: 18, fontWeight: 'bold' }
});

export default HomeScreen;
