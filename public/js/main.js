// public/js/main.js
// Global Frontend Controller (LIVE)

console.log("✅ main.js loaded successfully");

// ================= SPLASH → HOME =================
window.addEventListener("load", () => {
  console.log("🚀 App Loaded");

  setTimeout(() => {
    const splash = document.getElementById("splash");
    const home = document.getElementById("home");

    if (splash && home) {
      splash.style.display = "none";
      home.style.display = "block";
      console.log("✅ Splash hidden, Home shown");
    } else {
      console.error("❌ Splash or Home element missing");
    }
  }, 2000);
});

// ================= API BASE (Future Express) =================
const API_BASE = "/api";

// ================= Helper =================
async function apiRequest(url, method = "GET", data = null) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const res = await fetch(API_BASE + url, options);
  return await res.json();
}

// ================= Examples (Future Use) =================
async function acceptOrder(orderId) {
  try {
    const result = await apiRequest("/orders", "POST", {
      action: "accept",
      orderId,
    });
    alert(result.message || "Order Accepted");
  } catch (err) {
    console.error("Order error:", err);
    alert("Order failed");
  }
}

async function loadWallet() {
  try {
    const wallet = await apiRequest("/wallet");
    console.log("Wallet:", wallet);
  } catch (e) {
    console.error("Wallet load failed");
  }
}
