// ☰ Sidebar
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
document.getElementById("menuBtn").onclick = () => {
  sidebar.classList.add("open");
  overlay.classList.add("show");
};
overlay.onclick = () => {
  sidebar.classList.remove("open");
  overlay.classList.remove("show");
};

// 🌍 Language Switch
const texts = {
  en: { title: "Move Smart with AlinGo", tag: "One App. All Mobility." },
  ur: { title: "الینگو کے ساتھ محفوظ سفر", tag: "ایک ایپ، ہر سہولت" },
  ar: { title: "تنقل بذكاء مع AlinGo", tag: "تطبيق واحد، كل الخدمات" }
};

document.getElementById("languageSelect").onchange = (e) => {
  const lang = e.target.value;
  document.getElementById("titleText").innerText = texts[lang]?.title || texts.en.title;
  document.getElementById("tagline").innerText = texts[lang]?.tag || texts.en.tag;
};

// 📲 Install App (PWA)
let deferredPrompt;
const installBtn = document.getElementById("installBtn");

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.hidden = false;
});

installBtn.onclick = async () => {
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  installBtn.hidden = true;
};
