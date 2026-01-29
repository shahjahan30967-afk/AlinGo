// سروسز کا ڈیٹا جو گول ڈسک پر نظر آئے گا
const alingoServices = [
    { id: 'food', name: 'کھانا', icon: '🍔', active: true },
    { id: 'grocery', name: 'گروسری', icon: '🛒', active: true },
    { id: 'taxi', name: 'ٹیکسی', icon: '🚕', active: true },
    { id: 'tickets', name: 'ٹکٹنگ', icon: '🎟️', active: true },
    { id: 'shopping', name: 'شاپنگ', icon: '🛍️', active: true },
    { id: 'travel', name: 'ٹریول', icon: '✈️', active: true }
];

// جب کسی سروس پر کلک ہو تو کیا ہو؟
function handleServiceClick(serviceId) {
    const displayArea = document.getElementById('display-area'); // انڈیکس فائل میں یہ آئی ڈی ہونی چاہیے
    
    if (serviceId === 'food') {
        loadFoodMenu();
    } else if (serviceId === 'taxi') {
        loadTaxiBooking();
    } else {
        alert(serviceId + " سروس جلد لائیو ہوگی!");
    }
}

// کھانا لوڈ کرنے کا فنکشن
function loadFoodMenu() {
    const area = document.getElementById('display-area');
    area.innerHTML = `
        <div class="animate__animated animate__fadeInUp p-4 bg-white rounded-3xl shadow-lg">
            <h3 class="text-xl font-bold mb-4 text-[#004a99]">تازہ کھانا آرڈر کریں</h3>
            <div class="grid grid-cols-1 gap-4">
                <div class="flex justify-between items-center border-b pb-2">
                    <span>چکن بریانی (فل)</span>
                    <button onclick="confirmOrder('Biryani', 350)" class="bg-[#1eb53a] text-white px-3 py-1 rounded-lg">Rs. 350</button>
                </div>
            </div>
        </div>
    `;
}


let map, marker;

// ٹیکسی مینیو کھولنے کا فنکشن
function loadTaxiBooking() {
    document.getElementById('taxi-section').classList.remove('hidden');
    initMap();
}

function initMap() {
    // کسٹمر کی موجودہ لوکیشن حاصل کرنا
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const userLoc = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            // میپ لوڈ کرنا (گوگل میپس لائبریری درکار ہوگی)
            map = new google.maps.Map(document.getElementById("map"), {
                center: userLoc,
                zoom: 15,
                disableDefaultUI: true
            });

            marker = new google.maps.Marker({
                position: userLoc,
                map: map,
                title: "آپ یہاں ہیں"
            });
        });
    } else {
        alert("براہ کرم لوکیشن آن کریں");
    }
}

async function bookRide() {
    const vehicle = "Bike"; // یہ سلیکشن سے آئے گا
    const location = document.getElementById('pickup-location').value;

    try {
        await db.collection('orders').add({
            item: "Taxi Request: " + vehicle,
            customerLocation: location,
            status: "Pending",
            time: firebase.firestore.FieldValue.serverTimestamp()
        });
        alert("ڈرائیور آپ کی طرف آ رہا ہے!");
    } catch (e) {
        console.error(e);
    }
}



// سیکشن کھولنے کا فنکشن
function openService(id) {
    document.getElementById(id + '-section').classList.remove('hidden');
}

// سیکشن بند کرنے کا فنکشن
function closeSection(id) {
    document.getElementById(id).classList.add('hidden');
}

// ٹکٹ بکنگ کا فنکشن
async function bookTicket(type) {
    const userPhone = prompt("برائے مہربانی اپنا فون نمبر لکھیں:");
    if(userPhone) {
        try {
            await db.collection('orders').add({
                item: "Ticket: " + type,
                customerPhone: userPhone,
                status: "Pending",
                time: firebase.firestore.FieldValue.serverTimestamp()
            });
            alert(type + " ٹکٹ کی درخواست بھیج دی گئی ہے! ہمارا نمائندہ آپ سے رابطہ کرے گا۔");
        } catch (e) {
            alert("خرابی پیش آگئی!");
        }
    }
}
