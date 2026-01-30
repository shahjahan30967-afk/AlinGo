const splash = document.getElementById("splash");
const home = document.getElementById("home");
const emojiBox = document.getElementById("emoji-fall");

const emojis = ["🚕","🍔","🛒","✈️","📦","🎟️","💳"];

function dropEmoji(){
  const e = document.createElement("div");
  e.textContent = emojis[Math.floor(Math.random()*emojis.length)];
  e.style.position="absolute";
  e.style.left=Math.random()*100+"%";
  e.style.top="-20px";
  e.style.fontSize="22px";
  emojiBox.appendChild(e);

  let y = -20;
  const fall = setInterval(()=>{
    y+=3;
    e.style.top=y+"px";
    if(y>window.innerHeight-80){
      clearInterval(fall);
    }
  },16);
}

setInterval(dropEmoji,700);

setTimeout(()=>{
  splash.style.display="none";
  home.style.display="block";
},10000);
