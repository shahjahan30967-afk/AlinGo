/* ================= SPLASH EMOJI FALL ================= */

const emojis = ["🚕","🍔","🛒","✈️","🎟️","📦"];
const fallBox = document.getElementById("emoji-fall");

emojis.forEach((emoji, i) => {
  const el = document.createElement("div");
  el.textContent = emoji;
  el.style.position = "absolute";
  el.style.left = (12 + i * 12) + "%";
  el.style.top = "-40px";
  el.style.fontSize = "22px";
  fallBox.appendChild(el);

  setTimeout(() => {
    el.animate(
      [
        { transform: "translateY(0)" },
        { transform: "translateY(80vh)" },
        { transform: "translateY(74vh)" }
      ],
      {
        duration: 2200,
        easing: "ease-out",
        fill: "forwards"
      }
    );
  }, i * 700);
});

/* ================= SHOW HOME ================= */

setTimeout(() => {
  document.getElementById("splash").style.display = "none";
  document.getElementById("home").style.display = "block";
}, 10000);
