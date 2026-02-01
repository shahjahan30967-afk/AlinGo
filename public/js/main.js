// 1. ویب سائٹ لوڈ ہوتے ہی سپلیش ختم اور ہوم دکھائیں (بغیر کسی تاخیر کے)
window.addEventListener("load", () => {
    const splash = document.getElementById("splash");
    const home = document.getElementById("home");

    if (splash) splash.style.display = "none";
    if (home) home.style.display = "flex"; // ہم نے CSS میں flex استعمال کیا ہے
});

// 2. سائیڈ مینیو (Side Menu) کو کنٹرول کرنے کا فنکشن
function toggleMenu() {
    const menu = document.getElementById("side-menu");
    if (menu) {
        menu.classList.toggle("open");
    }
}

// 3. اگر صارف مینیو کے باہر کہیں کلک کرے تو مینیو بند ہو جائے
window.addEventListener("click", (e) => {
    const menu = document.getElementById("side-menu");
    const menuBtn = document.querySelector(".menu-btn");
    const serviceBtn = document.querySelector(".primary");

    if (menu && menu.classList.contains("open")) {
        // اگر کلک مینیو، مینیو بٹن یا سروسز بٹن پر نہ ہو تو مینیو بند کر دیں
        if (!menu.contains(e.target) && e.target !== menuBtn && !serviceBtn.contains(e.target)) {
            menu.classList.remove("open");
        }
    }
});
