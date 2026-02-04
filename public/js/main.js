/**
 * AlinGo - Integrated Master Script
 * اس کوڈ میں سپلیش، سائیڈ بار، لینگویج سوئچر اور PWA لاجک کو بائنڈ کیا گیا ہے۔
 */

// 1. سپلیش اسکرین ہینڈلر (پراپر لوڈنگ کے ساتھ)
window.addEventListener("load", () => {
    const splash = document.getElementById("splash");
    const home = document.getElementById("home");

    // تھوڑی سی اینیمیشن کے بعد سپلیش ختم کرنا بہتر ہوتا ہے تاکہ جھٹکا نہ لگے
    setTimeout(() => {
        if (splash) {
            splash.style.opacity = "0";
            setTimeout(() => splash.style.display = "none", 500);
        }
        if (home) {
            home.style.display = "flex";
            home.style.opacity = "1";
        }
    }, 1000); // 1 سیکنڈ کا وقفہ تاکہ لوگو نظر آئے
});

// 2. سائیڈ بار اور اوورلے کنٹرول (Combined Logic)
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const menuBtn = document.getElementById("menuBtn");

// مینیو کھولنے اور بند کرنے کا فنکشن
function toggleMenu(action) {
    if (action === "open") {
        sidebar.classList.add("open");
        overlay.classList.add("show");
    } else {
        sidebar.classList.remove("open");
        overlay.classList.remove("show");
    }
}

// ایونٹ لسنرز
if (menuBtn) {
    menuBtn.onclick = () => toggleMenu("open");
}

if (overlay) {
    overlay.onclick = () => toggleMenu("close");
}

// مینیو کے باہر کلک کرنے پر بند ہونا
window.addEventListener("click", (e) => {
    if (sidebar && sidebar.classList.contains("open")) {
        // اگر کلک سائیڈ بار پر نہیں اور نہ ہی مینیو بٹن پر، تو بند کر دیں
        if (!sidebar.contains(e.target) && e.target !== menuBtn) {
            toggleMenu("close");
        }
    }
});

// 3. کثیر اللسانی نظام (Language Switcher)
const translations = {
    en: { title: "Move Smart with AlinGo", tag: "One App. All Mobility." },
    ur: { title: "الینگو کے ساتھ محفوظ سفر", tag: "ایک ایپ، ہر سہولت" },
    ar: { title: "تنقل بذكاء مع AlinGo", tag: "تطبيق واحد، كل الخدمات" },
    fr: { title: "Bougez malin avec AlinGo", tag: "Une application. Toute la mobilité." },
    zh: { title: "与 AlinGo 一起智能出行", tag: "一个应用，全能出行" }
};

const langSelect = document.getElementById("languageSelect");
if (langSelect) {
    langSelect.onchange = (e) => {
        const lang = e.target.value;
        const titleEl = document.getElementById("titleText");
        const tagEl = document.getElementById("tagline");

        if (titleEl) titleEl.innerText = translations[lang]?.title || translations.en.title;
        if (tagEl) tagEl.innerText = translations[lang]?.tag || translations.en.tag;
        
        // زبان کے حساب سے ڈائریکشن (RTL/LTR) تبدیل کریں
        document.body.dir = (lang === 'ur' || lang === 'ar') ? 'rtl' : 'ltr';
    };
}

// 4. PWA انسٹالیشن (Install App Logic)
let deferredPrompt;
const installBtn = document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt", (e) => {
    // براؤزر کا ڈیفالٹ پرامپٹ روکیں
    e.preventDefault();
    deferredPrompt = e;
    // انسٹال بٹن دکھائیں
    if (installBtn) installBtn.hidden = false;
});

if (installBtn) {
    installBtn.onclick = async () => {
        if (!deferredPrompt) return;
        
        // انسٹالیشن پرامپٹ دکھائیں
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        
        console.log(`User response to install: ${outcome}`);
        deferredPrompt = null;
        installBtn.hidden = true;
    };
}

// 5. سروس ورکر رجسٹریشن (بیک گراؤنڈ کاموں کے لیے)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then(reg => console.log('AlinGo SW Registered'))
            .catch(err => console.log('SW Registration Failed:', err));
    });
}
