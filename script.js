// Firebase Configuration (یہاں اپنی کیز ڈالیں)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "alingo-app.firebaseapp.com",
    projectId: "alingo-app",
    storageBucket: "alingo-app.appspot.com",
    messagingSenderId: "123456789",
    appId: "your-app-id"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

// کسی بھی سروس پر کلک کرنے کا فنکشن
async function openService(serviceName) {
    console.log(serviceName + " کھولی جا رہی ہے...");
    
    // اگر کھانا یا گروسری ہے تو ڈیٹا بیس سے لسٹ لائیں
    if(serviceName === 'کھانا' || serviceName === 'گروسری') {
        alert(serviceName + " کی لسٹ لوڈ ہو رہی ہے، براہ کرم انتظار کریں...");
        // یہاں ہم مستقبل میں ایک نیا پیج یا ماڈل دکھائیں گے
    } else {
        alert(serviceName + " سروس جلد شروع کی جائے گی۔");
    }
}

// آرڈر بک کرنے کا فنکشن
async function placeOrder(item, price) {
    try {
        await db.collection('orders').add({
            item: item,
            price: price,
            time: firebase.firestore.FieldValue.serverTimestamp(),
            status: 'Pending'
        });
        alert("آپ کا آرڈر موصول ہو گیا ہے!");
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}
