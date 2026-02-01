import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';

// 1. موبائل نمبر پر OTP بھیجنے کا فنکشن
export const sendOTP = async (phoneNumber) => {
    try {
        const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
        console.log("OTP Sent Successfully");
        return confirmation; // یہ 'confirmation' آبجیکٹ ہمیں کوڈ ویریفائی کرنے کے لیے چاہیے ہوگا
    } catch (error) {
        Alert.alert("Error", "نمبر درست نہیں ہے یا کوئی تکنیکی خرابی ہے۔");
        console.error(error);
        return null;
    }
};

// 2. موصول شدہ کوڈ (OTP) کو ویریفائی کرنے کا فنکشن
export const confirmCode = async (confirmation, code) => {
    try {
        const userCredential = await confirmation.confirm(code);
        console.log("User Logged In:", userCredential.user.uid);
        return userCredential.user;
    } catch (error) {
        Alert.alert("Invalid Code", "درج کیا گیا کوڈ غلط ہے۔ دوبارہ کوشش کریں۔");
        return null;
    }
};

// 3. لاگ آؤٹ فنکشن
export const logoutUser = async () => {
    try {
        await auth().signOut();
        console.log("Logged Out");
    } catch (error) {
        console.error(error);
    }
};
