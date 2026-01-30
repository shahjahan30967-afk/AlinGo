function goToOTP(e){
  e.preventDefault();
  location.href = "otp.html";
}

function verifyOTP(){
  const otp = document.getElementById("otp").value;
  if(otp.length === 4){
    location.href = "success.html";
  }else{
    alert("Invalid OTP");
  }
}
