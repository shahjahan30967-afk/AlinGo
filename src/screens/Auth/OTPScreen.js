import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator, 
  Alert 
} from 'react-native';
import Colors from '../../constants/Colors';
import { sendOTP, confirmCode } from '../../services/authService';

const OTPScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [code, setCode] = useState('');
  const [confirm, setConfirm] = useState(null); // Firebase confirmation object
  const [loading, setLoading] = useState(false);

  // مرحلہ 1: OTP بھیجنا
  const handleSendOTP = async () => {
    if (phoneNumber.length < 10) {
      Alert.alert("غلطی", "براہ کرم درست موبائل نمبر درج کریں۔");
      return;
    }
    setLoading(true);
    const confirmation = await sendOTP(phoneNumber);
    setLoading(false);
    if (confirmation) {
      setConfirm(confirmation);
    }
  };

  // مرحلہ 2: کوڈ کی تصدیق کرنا
  const handleVerifyOTP = async () => {
    if (code.length < 6) {
      Alert.alert("غلطی", "براہ کرم 6 ہندسوں کا کوڈ درج کریں۔");
      return;
    }
    setLoading(true);
    const user = await confirmCode(confirm, code);
    setLoading(false);
    if (user) {
      // اگر تصدیق کامیاب ہو جائے تو ہوم اسکرین پر بھیجیں
      navigation.replace('Home');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Alingo Food</Text>
      
      {!confirm ? (
        // فون نمبر ان پٹ سیکشن
        <View>
          <Text style={styles.label}>اپنا موبائل نمبر درج کریں</Text>
          <TextInput
            placeholder="+92 300 1234567"
            style={styles.input}
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          <TouchableOpacity 
            style={styles.button} 
            onPress={handleSendOTP}
            disabled={loading}
          >
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>OTP حاصل کریں</Text>}
          </TouchableOpacity>
        </View>
      ) : (
        // او ٹی پی کوڈ ان پٹ سیکشن
        <View>
          <Text style={styles.label}>تصدیقی کوڈ درج کریں</Text>
          <TextInput
            placeholder="123456"
            style={styles.input}
            keyboardType="number-pad"
            maxLength={6}
            value={code}
            onChangeText={setCode}
          />
          <TouchableOpacity 
            style={styles.button} 
            onPress={handleVerifyOTP}
            disabled={loading}
          >
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>تصدیق کریں</Text>}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setConfirm(null)} style={styles.resendBtn}>
            <Text style={styles.resendText}>نمبر تبدیل کریں</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, justifyContent: 'center', backgroundColor: '#fff' },
  header: { fontSize: 36, color: Colors.primary, fontWeight: 'bold', textAlign: 'center', marginBottom: 40 },
  label: { fontSize: 16, marginBottom: 12, color: '#333', fontWeight: '500' },
  input: { 
    borderWidth: 1.5, 
    borderColor: '#eee', 
    padding: 15, 
    borderRadius: 12, 
    fontSize: 18, 
    marginBottom: 25,
    backgroundColor: '#f9f9f9' 
  },
  button: { 
    backgroundColor: Colors.primary, 
    padding: 18, 
    borderRadius: 12, 
    alignItems: 'center',
    elevation: 2 
  },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  resendBtn: { marginTop: 20, alignItems: 'center' },
  resendText: { color: Colors.secondary, fontSize: 14, textDecorationLine: 'underline' }
});

export default OTPScreen;
