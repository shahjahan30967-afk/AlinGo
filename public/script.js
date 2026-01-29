/* ================= SPLASH EMOJI FALL ================= */
const splashEmojis = ["🚕","🍔","🛒","✈️","🎟️","📦"];
const fallBox = document.getElementById("emoji-fall");

splashEmojis.forEach((emoji, i) => {
  const el = document.createElement("div");
  el.textContent = emoji;
  el.style.position = "absolute";
  el.style.left = (12 + i * 12) + "%";
  el.style.top = "-40px";
  el.style.fontSize = "22px";
  fallBox.appendChild(el);

  setTimeout(() => {
    el.animate([
      { transform: "translateY(0)" },
      { transform: "translateY(80vh)" },
      { transform: "translateY(74vh)" }
    ], {
      duration: 2200,
      easing: "ease-out",
      fill: "forwards"
    });
  }, i * 700);
});

/* ================= HOME LOAD ================= */
setTimeout(() => {
  document.getElementById("splash").style.display = "none";
  document.getElementById("home").style.display = "block";

  initOrbit();
}, 10000);

/* ================= ORBIT EMOJIS ================= */
function initOrbit(){
  const emojis = ["🚕","🍔","🛒","✈️","🎟️","📦"];
  const orbit = document.getElementById("orbit");
  const radius = 95; // logo disk کے گرد فاصلہ

  emojis.forEach((emoji, i) => {
    const item = document.createElement("div");
    item.className = "orbit-item";
    item.textContent = emoji;

    const angle = (360 / emojis.length) * i;
    item.style.transform =
      `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`;

    orbit.appendChild(item);
  });
}
