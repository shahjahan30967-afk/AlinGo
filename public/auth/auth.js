// TEMP STORE (Later DB / API)
let generatedOTP = null;

// Dummy users (later real DB)
const users = {
  "03001234567": "admin",
  "03009876543": "seller",
  "03005554444": "driver",
  "03001112222": "investor"
};

function sendOTP(){
  const phone = document.getElementById("phone").value;
  if(!phone){
    alert("Enter phone number");
    return;
  }

  generatedOTP = Math.floor(100000 + Math.random()*900000);
  sessionStorage.setItem("phone", phone);
  sessionStorage.setItem("otp", generatedOTP);

  console.log("OTP (demo):", generatedOTP);
  window.location.href = "verify.html";
}

function verifyOTP(){
  const entered = document.getElementById("otp").value;
  const saved = sessionStorage.getItem("otp");
  const phone = sessionStorage.getItem("phone");

  if(entered != saved){
    document.getElementById("msg").innerText = "Invalid OTP";
    return;
  }

  const role = users[phone] || "customer";
  sessionStorage.setItem("role", role);

  redirectRole(role);
}

function redirectRole(role){
  window.location.href = `../roles/${role}.html`;
}
